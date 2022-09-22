"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var angular_1 = require("angular");
var angular = require("angular");
require("angular-mocks");
var ngimport_1 = require("ngimport");
var PropTypes = require("prop-types");
var React = require("react");
var test_utils_1 = require("react-dom/test-utils");
var _1 = require("./");
var TestOne = /** @class */ (function (_super) {
    __extends(TestOne, _super);
    function TestOne() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestOne.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("p", null,
                "Foo: ",
                this.props.foo),
            React.createElement("p", null,
                "Bar: ",
                this.props.bar.join(',')),
            React.createElement("p", { onClick: function () { return _this.props.baz(42); } }, "Baz"),
            this.props.children));
    };
    TestOne.prototype.componentWillUnmount = function () { };
    return TestOne;
}(React.Component));
var TestTwo = function (props) { return (React.createElement("div", null,
    React.createElement("p", null,
        "Foo: ",
        props.foo),
    React.createElement("p", null,
        "Bar: ",
        props.bar.join(',')),
    React.createElement("p", { onClick: function () { return props.baz(42); } }, "Baz"),
    props.children)); };
var TestThree = function () { return React.createElement("div", null, "Foo"); };
var TestFour = /** @class */ (function (_super) {
    __extends(TestFour, _super);
    function TestFour() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestFour.prototype.render = function () {
        return React.createElement("div", null, "Foo");
    };
    return TestFour;
}(React.Component));
var TestFive = /** @class */ (function (_super) {
    __extends(TestFive, _super);
    function TestFive() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestFive.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("p", null,
                "Foo: ",
                this.props.foo),
            React.createElement("p", null,
                "Bar: ",
                this.props.bar.join(',')),
            React.createElement("p", { onClick: function () { return _this.props.baz(42); } }, "Baz"),
            this.props.children));
    };
    TestFive.prototype.componentWillUnmount = function () { };
    TestFive.propTypes = {
        bar: PropTypes.array.isRequired,
        baz: PropTypes.func.isRequired,
        foo: PropTypes.number.isRequired
    };
    return TestFive;
}(React.Component));
var TestSixService = /** @class */ (function () {
    function TestSixService($q) {
        this.$q = $q;
    }
    TestSixService.prototype.foo = function () {
        return this.$q.resolve('testSixService result');
    };
    return TestSixService;
}());
var TestSix = /** @class */ (function (_super) {
    __extends(TestSix, _super);
    function TestSix() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            elementText: '',
            result: '',
            testSixService: ''
        };
        return _this;
    }
    TestSix.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("p", null, this.state.result),
            React.createElement("p", null, this.state.elementText),
            React.createElement("p", null, this.state.testSixService),
            React.createElement("p", null, this.props.foo),
            React.createElement("span", null, "$element result")));
    };
    TestSix.prototype.componentDidMount = function () {
        var _this = this;
        this.setState({
            elementText: this.props.$element.find('span').text()
        });
        this.props.$http
            .get('https://example.com/')
            .then(function (_) { return _this.setState({ result: _.data }); });
        this.props.testSixService
            .foo()
            .then(function (_) { return _this.setState({ testSixService: _ }); });
    };
    return TestSix;
}(React.Component));
function TestSeven(props) {
    return React.createElement("p", null, props.foo);
}
var TestEight = /** @class */ (function (_super) {
    __extends(TestEight, _super);
    function TestEight() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TestEight.prototype.render = function () {
        this.props.onRender();
        return this.props.values.map(function (value, index) { return (React.createElement("div", { key: index }, value)); });
    };
    TestEight.prototype.componentWillUnmount = function () {
        this.props.onComponentWillUnmount();
        this.props.onChange(this.props.values.map(function (val) { return val + "ss"; }));
    };
    return TestEight;
}(React.Component));
var TestEightWrapper = /** @class */ (function () {
    function TestEightWrapper() {
        this.bindings = {
            onComponentWillUnmount: '<',
            onRender: '<',
            values: '<'
        };
        this.template = "<test-angular-eight\n                on-change=\"$ctrl.onChange\"\n                on-component-will-unmount=\"$ctrl.onComponentWillUnmount\"\n                on-render=\"$ctrl.onRender\"\n                values=\"$ctrl.values\">\n              </test-angular-eight>";
        this.controller = /** @class */ (function () {
            function class_1($scope) {
                var _this = this;
                this.$scope = $scope;
                this.onChange = function (values) {
                    _this.values = values;
                    _this.$scope.$apply();
                };
            }
            return class_1;
        }());
    }
    return TestEightWrapper;
}());
var TestAngularOne = _1.react2angular(TestOne, ['foo', 'bar', 'baz']);
var TestAngularTwo = _1.react2angular(TestTwo, ['foo', 'bar', 'baz']);
var TestAngularThree = _1.react2angular(TestThree);
var TestAngularFour = _1.react2angular(TestFour);
var TestAngularSix = _1.react2angular(TestSix, ['foo'], ['$http', '$element', 'testSixService', 'foo']);
var TestAngularSeven = _1.react2angular(TestSeven, null, ['foo']);
var TestAngularEight = _1.react2angular(TestEight, [
    'values',
    'onComponentWillUnmount',
    'onRender',
    'onChange'
]);
angular_1.module('test', ['bcherny/ngimport'])
    .component('testAngularOne', TestAngularOne)
    .component('testAngularTwo', TestAngularTwo)
    .component('testAngularThree', TestAngularThree)
    .component('testAngularFour', TestAngularFour)
    .service('testSixService', ['$q', TestSixService])
    .constant('foo', 'CONSTANT FOO')
    .component('testAngularSix', TestAngularSix)
    .component('testAngularSeven', TestAngularSeven)
    .component('testAngularEight', TestAngularEight)
    .component('testAngularEightWrapper', new TestEightWrapper());
angular_1.bootstrap(angular_1.element(), ['test'], { strictDi: true });
describe('react2angular', function () {
    var $compile;
    beforeEach(function () {
        angular.mock.module('test');
        angular.mock.inject(function (_$compile_) {
            $compile = _$compile_;
        });
    });
    describe('initialization', function () {
        it('should give an angular component', function () {
            expect(TestAngularOne.bindings).not.toBe(undefined);
            expect(TestAngularOne.controller).not.toBe(undefined);
        });
        it('should use the propTypes when present and no bindingNames were specified', function () {
            var reactAngularComponent = _1.react2angular(TestFive);
            expect(reactAngularComponent.bindings).toEqual({
                bar: '<',
                baz: '<',
                foo: '<'
            });
        });
        it('should use the bindingNames when present over the propTypes', function () {
            var reactAngularComponent = _1.react2angular(TestFive, ['foo']);
            expect(reactAngularComponent.bindings).toEqual({
                foo: '<'
            });
        });
        it('should have empty bindings when parameter is an empty array', function () {
            var reactAngularComponent = _1.react2angular(TestFive, []);
            expect(reactAngularComponent.bindings).toEqual({});
        });
        it('should have empty bindings when parameter is not passed', function () {
            expect(_1.react2angular(TestThree).bindings).toEqual({});
        });
        it('should use the injectNames for DI', function () {
            var defaultDi = _1.react2angular(TestThree).controller.slice(0, -1);
            var injectedDi = _1.react2angular(TestThree, null, ['foo', 'bar']).controller.slice(0, -1);
            expect(injectedDi).toEqual(defaultDi.concat(['foo', 'bar']));
        });
        it('should have default DI specifications if injectNames is empty', function () {
            var defaultDi = _1.react2angular(TestThree).controller.slice(0, -1);
            var injectedDi = _1.react2angular(TestThree, null, []).controller.slice(0, -1);
            expect(injectedDi).toEqual(defaultDi);
        });
    });
    xdescribe('react classes', function () {
        it('should render', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-one foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-one>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.find('p').length).toBe(3);
        });
        it('should render (even if the component takes no props)', function () {
            var scope = ngimport_1.$rootScope.$new(true);
            var element = angular_1.element("<test-angular-four></test-angular-four>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.text()).toBe('Foo');
        });
        it('should update', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-one foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-one>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.find('p').eq(1).text()).toBe('Bar: true,false');
            scope.$apply(function () { return (scope.bar = [false, true, true]); });
            expect(element.find('p').eq(1).text()).toBe('Bar: false,true,true');
        });
        it('should destroy', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-one foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-one>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            spyOn(TestOne.prototype, 'componentWillUnmount');
            scope.$destroy();
            expect(TestOne.prototype.componentWillUnmount).toHaveBeenCalled();
        });
        it('should take callbacks', function () {
            var baz = jasmine.createSpy('baz');
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: baz,
                foo: 1
            });
            var element = angular_1.element("<test-angular-one foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-one>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            test_utils_1.Simulate.click(element.find('p').eq(2)[0]);
            expect(baz).toHaveBeenCalledWith(42);
        });
        // TODO: support children
        it('should not support children', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-one foo=\"foo\" bar=\"bar\" baz=\"baz\"><span>Transcluded</span></test-angular-one>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.find('span').length).toBe(0);
        });
        it('should take injections, which override props', function () {
            spyOn(ngimport_1.$http, 'get').and.returnValue(
            // @ts-ignore: unknown type error
            ngimport_1.$q.resolve({ data: '$http response' }));
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                foo: 'FOO'
            });
            var element1 = angular_1.element("<test-angular-six foo=\"foo\"></test-angular-six>");
            $compile(element1)(scope);
            var element2 = angular_1.element("<test-angular-seven foo=\"foo\"></test-angular-seven>");
            $compile(element2)(scope);
            ngimport_1.$rootScope.$apply();
            expect(ngimport_1.$http.get).toHaveBeenCalledWith('https://example.com/');
            expect(element1.find('p').eq(0).text()).toBe('$http response', '$http is injected');
            expect(element1.find('p').eq(1).text()).toBe('$element result', '$element is injected');
            expect(element1.find('p').eq(2).text()).toBe('testSixService result', 'testSixService is injected');
            expect(element1.find('p').eq(3).text()).toBe('CONSTANT FOO', 'injections should override props');
            expect(element2.find('p').text()).toBe('CONSTANT FOO', 'injections should override props');
        });
    });
    xdescribe('react stateless components', function () {
        it('should render', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-two foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-two>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.find('p').length).toBe(3);
        });
        it('should render (even if the component takes no props)', function () {
            var scope = ngimport_1.$rootScope.$new(true);
            var element = angular_1.element("<test-angular-three></test-angular-three>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.text()).toBe('Foo');
        });
        it('should update', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-two foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-two>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.find('p').eq(1).text()).toBe('Bar: true,false');
            scope.$apply(function () { return (scope.bar = [false, true, true]); });
            expect(element.find('p').eq(1).text()).toBe('Bar: false,true,true');
        });
        it('should take callbacks', function () {
            var baz = jasmine.createSpy('baz');
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: baz,
                foo: 1
            });
            var element = angular_1.element("<test-angular-two foo=\"foo\" bar=\"bar\" baz=\"baz\"></test-angular-two>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            test_utils_1.Simulate.click(element.find('p').eq(2)[0]);
            expect(baz).toHaveBeenCalledWith(42);
        });
        // TODO: support children
        it('should not support children', function () {
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                bar: [true, false],
                baz: function (value) { return value + 1; },
                foo: 1
            });
            var element = angular_1.element("<test-angular-two foo=\"foo\" bar=\"bar\" baz=\"baz\"><span>Transcluded</span></test-angular-two>");
            $compile(element)(scope);
            ngimport_1.$rootScope.$apply();
            expect(element.find('span').length).toBe(0);
        });
        it('should not call render after component unmount', function () {
            var componentWillUnmountSpy = jasmine.createSpy('componentWillUnmount');
            var renderSpy = jasmine.createSpy('render');
            var scope = Object.assign(ngimport_1.$rootScope.$new(true), {
                onComponentWillUnmount: componentWillUnmountSpy,
                onRender: renderSpy,
                values: ['val1']
            });
            var element = angular_1.element("\n        <test-angular-eight-wrapper\n          on-render=\"onRender\"\n          on-component-will-unmount=\"onComponentWillUnmount\"\n          values=\"values\">\n        </test-angular-eight-wrapper>\n      ");
            $compile(element)(scope);
            var childScope = angular
                .element(element.find('test-angular-eight'))
                .scope();
            ngimport_1.$rootScope.$apply();
            // Erase first render caused on apply
            renderSpy.calls.reset();
            // Destroy child component to cause unmount
            childScope.$destroy();
            // Make sure render on child was not called after unmount
            expect(componentWillUnmountSpy.calls.count()).toEqual(1);
            expect(renderSpy.calls.count()).toEqual(0);
            expect(componentWillUnmountSpy).not.toHaveBeenCalledBefore(renderSpy);
        });
    });
});
//# sourceMappingURL=test.js.map