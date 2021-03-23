var api = require('./api.js');
var config = require('./config.js');
var utils = require('./utils.js');

function supportLanguages() {
    return config.supportedLanguages.map(([standardLang]) => standardLang);
}

function translate(query, completion) {
    const apiClient = new api.Api($option.apikey, $option.service);
    (async () => {
        const targetLanguage = utils.langMap.get(query.detectTo);
        if (!targetLanguage) {
            const err = new Error();
            Object.assign(err, {
                _type: 'unsupportLanguage',
                _message: '不支持该语种',
            });
            throw err;
        }
        const response = await apiClient.request({
            method: 'POST',
            url: '/translate',
            body: {
                text: query.text,
                source_lang: utils.langMap.get(query.detectFrom),
                target_lang: targetLanguage,
            },
        });
        if (response.error) {
            const { statusCode } = response.response;
            let reason;
            if (statusCode >= 400 && statusCode < 500) {
                reason = 'param';
            }
            else {
                reason = 'api';
            }
            completion({
                error: {
                    type: reason,
                    message: `接口响应错误 - ${response.data.msg}`,
                    addtion: JSON.stringify(response),
                },
            });
        }
        else {
            const translations = response.data;
            if (!translations || !Object.keys(translations).length) {
                completion({
                    error: {
                        type: 'api',
                        message: '接口未返回翻译结果',
                    },
                });
                return;
            } else if (!translations.status) {
                completion({
                    error: {
                        type: 'api',
                        message: `接口返回异常 - ${translations.msg}`,
                    },
                });
                return;
            }
            const translationsResult = $option.displayServiceName === "yes" ? `[${config.serviceDisplayName[$option.service]}] ${translations.result}` : translations.result;
            completion({
                result: {
                    from: utils.langMapReverse.get(translations.source_lang),
                    to: utils.langMapReverse.get(translations.target_lang),
                    toParagraphs: translationsResult.split('\n'),
                },
            });
        }
    })().catch((err) => {
        completion({
            error: {
                type: err._type || 'unknown',
                message: err._message || '未知错误',
                addtion: err._addtion,
            },
        });
    });
}

exports.supportLanguages = supportLanguages;
exports.translate = translate;
