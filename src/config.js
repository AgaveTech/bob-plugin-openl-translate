const supportedLanguages = [
    ['auto', 'auto'],
    ['zh-Hans', 'zh'],
    ['en', 'en'],
    ['de', 'de'],
    ['fr', 'fr'],
    ['it', 'it'],
    ['ja', 'ja'],
    ['es', 'es'],
    ['nl', 'nl'],
    ['pl', 'pl'],
    ['pt', 'pt'],
    ['ru', 'ru'],
];

const serviceDisplayName = {
    'deepl': 'DeepL',
    'youdao': '有道翻译',
    'tencent': '腾讯翻译君',
    'aliyun': '阿里翻译',
    'baidu': '百度翻译',
    'caiyun': '彩云小译',
    'sogou': '搜狗翻译',
    'azure': 'Azure 翻译',
    'ibm': 'IBM Watson',
    'aws': 'Amazon 翻译',
    'google': 'Google 翻译',
}

exports.supportedLanguages = supportedLanguages;
exports.serviceDisplayName = serviceDisplayName;
