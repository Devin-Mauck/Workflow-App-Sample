export default {
    name: 'hello-world-zzz-devin-clare.helloworld', // replace organization with your Kustomer organization name
    template: '<div style={ { padding: "10px" } }>Hello, {_.get(customer, "name")}!</div>',
    context: 'smartbar-card',
    resource: 'customer',
    meta: {
        displayName: 'Hello World',
        icon: 'earth',
        state: 'open'
    }
}
