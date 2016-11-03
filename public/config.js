var conf =
{
    domain: 'domain.ltd',
    server_type: 'socket.io',
    server: '192.168.4.128',
    // server: '192.168.106.44',  //测试机
    port: '3000',
    debug: true,
    auto_login: false,
    sound_active: true,
    login_popup: true,
    tools_disabled: false,
    search_case_sensitive: true,
    tools:
    {
        icon: 'ui-icon-wrench'
    },

    options_disabled: false,
    options:
    {
        icon: 'ui-icon-triangle-1-n'
    },

    bar:
    {
        default_expand: true,
        icon_expand: 'ui-icon-arrowthickstop-1-e',
        icon_collapse: 'ui-icon-arrowthickstop-1-w'
    },

    theme_default: 'smoothness',
    themes:
    [
        { name: 'black-tie' },
        { name: 'blitzer' },
        { name: 'cupertino' },
        { name: 'dark-hive' },
        { name: 'dot-luv' },
        { name: 'eggplant' },
        { name: 'excite-bike' },
        { name: 'flick' },
        { name: 'hot-sneaks' },
        { name: 'humanity' },
        { name: 'le-frog' },
        { name: 'mint-choc' },
        { name: 'overcast' },
        { name: 'pepper-grinder' },
        { name: 'redmond' },
        { name: 'south-street' },
        { name: 'start' },
        { name: 'sunny' },
        { name: 'swanky-purse' },
        { name: 'trontastic' },
        { name: 'ui-darkness' },
        { name: 'ui-lightness' },
        { name: 'vader' }
    ],

    lang_default: 'cn', //Default selected lang in 'options', for change current language go to script tag in 'index.html'.
    lang:
    [
        {
            text: '中文',
            i18n: 'cn'
        },
        {
            text: 'English',
            i18n: 'en'
        },
        {
            text: 'French',
            i18n: 'fr'
        },
        {
            text: 'Spanish',
            i18n: 'es'
        }
    ],

    shortcuts:
    [
        {
            text: 'Home',
            href: 'https://',
            icon: 'ui-icon-home',
            target: '_blank'
        },
        {
            text: 'Mail',
            href: 'https://',
            icon: 'ui-icon-mail-closed',
            target: '_blank'
        },
        {
            text: 'Barcode Checker',
            href: 'http://cloudflow.cymmetrik.com:9090/public/barcodeCheck.html',
            icon: 'ui-icon-search',
            target: '_blank'
        }
    ]
}
