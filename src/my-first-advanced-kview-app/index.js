import Kviews from './kviews';

// When trying to install or use this template, make sure to postfix the `app` property below with a unique value.
// For example, my_first_advanced_kview_app__myKustomerOrg01_01
export default {
    app: 'my_first_advanced_kview_app',
    version: '1.0.0',
    appDetails: { // note: the object and all it's fields are optional, but will be used to fill out the app store listing within Kustomer
        appDeveloper: {
            name: '<<Insert the developer\'s name>>',
            website: '<<Insert the developer\'s website>>',
            supportEmail: 'example@email.com',
        },
        externalPlatform: {
            name: '<<Insert the name of your platform/company>>',
            website:'<<Insert the url for your platform/company>>',
        },
        documentationLinks: [{
            title: '<<Insert the display title for your documentation>>',
            url: 'www.example.com',
        }],
    },
    title: 'My First Advanced Kview App',
    description: 'This app builds upon the already powerful basic kview app, including a kview that can point to a remote url utilizing Kustomer\'s Cards SDK',
    iconUrl: 'https://pbs.twimg.com/profile_images/1146053597785993217/DcPQyO9Q_400x400.png',
    postInstallMessage: 'Congratulations! You\'ve installed an app with a Custom CardJs Kview',
    kviews: Kviews,
};
