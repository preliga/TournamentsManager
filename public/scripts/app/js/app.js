if (view.fileJsExist) {
    action = `/${view.file}.js`;
} else {
    action = `/scripts/app/js/action/Base.js`;
}

const mainAction = action;

requirejs.config({
    paths: {
        'cxlt-vue2-toastr': '/node_modules/cxlt-vue2-toastr/dist/js/cxlt-vue2-toastr'
    },
});

requirejs(
    [
        '/scripts/lib/PigFrameworkJS/App.js',
        'cxlt-vue2-toastr'
    ],
    function (
        App,
        CxltToastr
    ) {

        var toastrConfigs = {
            position: 'top right',
            showDuration: 2000,
            hideDuration: 4000
        };

        CxltToastr.default.install(Vue);
        Vue.use(CxltToastr.default, toastrConfigs);

        var app = new App();
        app.run();
    },
    function (err) {
        console.log(err);
    }
);