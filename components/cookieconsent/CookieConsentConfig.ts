import type { CookieConsentConfig } from 'vanilla-cookieconsent';

const getConfig = () => {
  const config: CookieConsentConfig = {
    // root: 'body',
    // autoShow: true,
    // disablePageInteraction: true,
    // hideFromBots: true,
    // mode: 'opt-in',
    // revision: 0,

    cookie: {
      // name: 'cc_cookie',
      // domain: location.hostname,
      // path: '/',
      // sameSite: "Lax",
      // expiresAfterDays: 365,
    },

    /**
     * Callback functions
     */
    onFirstConsent: ({ cookie }) => {
      console.log('onFirstConsent fired', cookie);
    },

    onConsent: ({ cookie }) => {
      console.log('onConsent fired!', cookie);
    },

    onChange: ({ changedCategories, changedServices }) => {
      console.log('onChange fired!', changedCategories, changedServices);
    },

    onModalReady: ({ modalName }) => {
      console.log('ready:', modalName);
    },

    onModalShow: ({ modalName }) => {
      console.log('visible:', modalName);
    },

    onModalHide: ({ modalName }) => {
      console.log('hidden:', modalName);
    },

    // https://cookieconsent.orestbida.com/reference/configuration-reference.html#guioptions
    guiOptions: {
      consentModal: {
        layout: 'box inline',
        position: 'bottom left',
        equalWeightButtons: true,
        flipButtons: false,
      },
      preferencesModal: {
        layout: 'box',
        equalWeightButtons: true,
        flipButtons: false,
      },
    },

    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      analytics: {
        autoClear: {
          cookies: [
            {
              name: /^_ga/, // regex: match all cookies starting with '_ga'
            },
            {
              name: '_gid', // string: exact cookie name
            },
          ],
        },

        // https://cookieconsent.orestbida.com/reference/configuration-reference.html#category-services
        services: {
          ga: {
            label: 'Google Analytics',
            onAccept: () => {},
            onReject: () => {},
          },
          youtube: {
            label: 'Youtube Embed',
            onAccept: () => {},
            onReject: () => {},
          },
        },
      },
      ads: {},
    },

    language: {
      default: 'en',
      translations: {
        en: {
          consentModal: {
            title: 'We use cookies',
            description:
              'We use cookies to improve user experience. Choose what cookies you allow us to use. You can read more about our Cookie Policy in our Privacy policy.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage Individual preferences',
            // closeIconLabel: 'Reject all and close modal',
            footer: `
                        <a href="/gdpr" target="_blank">Impressum</a>
                        <a href=/gdpr" target="_blank">Privacy Policy</a>
                    `,
          },
          preferencesModal: {
            title: 'Manage cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Accept current selection',
            closeIconLabel: 'Close modal',
            serviceCounterLabel: 'Service|Services',
            sections: [
              {
                title: 'Your Privacy Choices',
                description: `We use cookies to improve user experience. Choose what cookies you allow us to use. You can read more about our Cookie Policy in our Privacy policy.`,
              },
              {
                title: 'Strictly Necessary',
                description:
                  'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: 'necessary',
              },
              {
                title: 'Performance and Analytics',
                description:
                  'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                linkedCategory: 'analytics',
                cookieTable: {
                  caption: 'Cookie table',
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    desc: 'Description',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: location.hostname,
                      desc: 'Description 1',
                    },
                    {
                      name: '_gid',
                      domain: location.hostname,
                      desc: 'Description 2',
                    },
                  ],
                },
              },
              {
                title: 'Targeting and Advertising',
                description:
                  'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
                linkedCategory: 'ads',
              },
              {
                title: 'More information',
                description:
                  'For any queries in relation to my policy on cookies and your choices, please <a href="/contact">contact us</a>',
              },
            ],
          },
        },
        hu: {
          consentModal: {
            title: 'Sütiket használunk',
            description:
              'We use cookies to improve user experience. Choose what cookies you allow us to use. You can read more about our Cookie Policy in our Privacy policy.',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            showPreferencesBtn: 'Manage Individual preferences',
            // closeIconLabel: 'Reject all and close modal',
            footer: `
                        <a href="/gdpr" target="_blank">Impressum</a>
                        <a href=/gdpr" target="_blank">Privacy Policy</a>
                    `,
          },
          preferencesModal: {
            title: 'Manage cookie preferences',
            acceptAllBtn: 'Accept all',
            acceptNecessaryBtn: 'Reject all',
            savePreferencesBtn: 'Accept current selection',
            closeIconLabel: 'Close modal',
            serviceCounterLabel: 'Service|Services',
            sections: [
              {
                title: 'Your Privacy Choices',
                description: `We use cookies to improve user experience. Choose what cookies you allow us to use. You can read more about our Cookie Policy in our Privacy policy.`,
              },
              {
                title: 'Strictly Necessary',
                description:
                  'These cookies are essential for the proper functioning of the website and cannot be disabled.',

                //this field will generate a toggle linked to the 'necessary' category
                linkedCategory: 'necessary',
              },
              {
                title: 'Performance and Analytics',
                description:
                  'These cookies collect information about how you use our website. All of the data is anonymized and cannot be used to identify you.',
                linkedCategory: 'analytics',
                cookieTable: {
                  caption: 'Cookie table',
                  headers: {
                    name: 'Cookie',
                    domain: 'Domain',
                    desc: 'Description',
                  },
                  body: [
                    {
                      name: '_ga',
                      domain: location.hostname,
                      desc: 'Description 1',
                    },
                    {
                      name: '_gid',
                      domain: location.hostname,
                      desc: 'Description 2',
                    },
                  ],
                },
              },
              {
                title: 'Targeting and Advertising',
                description:
                  'These cookies are used to make advertising messages more relevant to you and your interests. The intention is to display ads that are relevant and engaging for the individual user and thereby more valuable for publishers and third party advertisers.',
                linkedCategory: 'ads',
              },
              {
                title: 'More information',
                description:
                  'For any queries in relation to my policy on cookies and your choices, please <a href="/contact">contact us</a>',
              },
            ],
          },
        }
      },
    },
  };

  return config;
};

export default getConfig;
