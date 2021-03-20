! function() {
    var e = function(e) {
            var t = {
                exports: {}
            };
            return e.call(t.exports, t, t.exports), t.exports
        },
        s = function() {
            function r(e, t) {
                var r = [],
                    n = !0,
                    o = !1,
                    a = undefined;
                try {
                    for (var i, u = e[Symbol.iterator](); !(n = (i = u.next()).done) && (r.push(i.value), !t || r.length !== t); n = !0);
                } catch (s) {
                    o = !0, a = s
                } finally {
                    try {
                        !n && u["return"] && u["return"]()
                    } finally {
                        if (o) throw a
                    }
                }
                return r
            }
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return r(e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        }(),
        c = function(e) {
            return e && e.__esModule ? e : {
                "default": e
            }
        },
        n = function(e) {
            if (Array.isArray(e)) {
                for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r
            }
            return Array.from(e)
        },
        u = e(function(e, t) {
            "use strict";

            function r(e) {
                "loading" !== document.readyState ? e() : document.addEventListener ? document.addEventListener("DOMContentLoaded", e) : document.attachEvent("onreadystatechange", function() {
                    "loading" !== document.readyState && e()
                })
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r
        }),
        y = e(function(e, t) {
            "use strict";

            function r(e) {
                return new Error('The feature { name: "' + e.name + '", version: "' + e.version + '"} does not exist')
            }

            function n(e) {
                return new Error("Could not create registry entry " + e)
            }

            function o() {
                return new Error("Cannot register a feature with the same selector twice")
            }

            function a(e) {
                return new Error("Features should be an Array. Received: " + JSON.stringify(e))
            }

            function i(e) {
                return new Error('Features should be defined as `{ name: "name", version: "version" }`. Received: ' + JSON.stringify(e))
            }

            function u(e, t) {
                return new Error(e + " has already been loaded at version " + t)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.featureNotFound = r, t.couldNotCreateEntry = n, t.couldNotAddToQuerySelectors = o, t.invalidFeaturesArray = a, t.invalidFeature = i, t.alreadyLoaded = u
        }),
        v = e(function(e, t) {
            "use strict";

            function r() {
                if (a) return a;
                var e = document.getElementById("shopify-features");
                if (e) try {
                    a = JSON.parse(e.textContent)
                } catch (t) {} else a = {};
                return a
            }

            function n() {
                var e = r();
                if (e) try {
                    return e.betas.reduce(function(e, t) {
                        return e[t] = !0, e
                    }, {})
                } catch (t) {}
                return {}
            }

            function o() {
                return r().locale || "en"
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.getBetas = n, t.getLocale = o;
            var a = void 0
        }),
        f = e(function(e, t) {
            "use strict";

            function r() {}
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r
        }),
        a = e(function(e, t) {
            "use strict";

            function r() {
                function e(e, t) {
                    u[e] = u[e] || [];
                    for (var r = u[e], n = 0; n < r.length; n++) {
                        var o = r[n],
                            a = o.name,
                            i = o.version;
                        if (t.name === a) {
                            if (t.version !== i) throw (0, y.couldNotAddToQuerySelectors)(e);
                            return
                        }
                    }
                    r.push(t)
                }

                function t() {
                    return Object.keys(u).reduce(function(e, t) {
                        if (!document.querySelector(t)) return e;
                        var r = u[t];
                        return delete u[t], e.concat(r)
                    }, [])
                }
                var u = {};
                return {
                    add: e,
                    getFeatures: t
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r
        }),
        p = e(function(e, t) {
            "use strict";

            function r(e) {
                var t = e.name,
                    r = e.baseName,
                    n = e.version,
                    o = e.betaFlag,
                    a = e.fileName,
                    i = e.legacy,
                    u = e.localized,
                    s = e.autoLoadSelector,
                    l = e.props,
                    d = l === undefined ? {} : l,
                    c = t + "@" + n;
                if (f[c]) throw (0, y.couldNotCreateEntry)(c);
                s && (Array.isArray(s) ? s : [s]).forEach(function(e) {
                    g.lookup.add(e, {
                        name: t,
                        version: n
                    })
                });
                f[c] = {
                    props: d,
                    betaFlag: o,
                    scriptId: c,
                    name: t,
                    baseName: r,
                    version: n,
                    locale: (0, v.getLocale)(),
                    localized: u,
                    legacy: i,
                    fileName: a
                }
            }

            function n() {
                l = {}
            }

            function o(e) {
                window.Shopify.modules ? (e.legacy = !1, e.props = {
                    type: "module"
                }, r(e)) : e.hasLegacy && (e.legacy = !0, e.props = {
                    nomodule: ""
                }, r(e))
            }

            function a(e) {
                var t = e.name + "@" + e.version,
                    r = f[t];
                if (!r) throw (0, y.featureNotFound)(e);
                var n = r.name,
                    o = r.baseName,
                    a = r.version,
                    i = r.localized && r.locale,
                    u = r.legacy,
                    s = r.fileName;
                if (l[n] && l[n] !== a) throw (0, y.alreadyLoaded)(t, l[n]);
                return l[n] = a, r.src = (0, d.urlForFeature)({
                    name: n,
                    baseName: o,
                    version: a,
                    legacy: u,
                    locale: i,
                    fileName: s
                }), r
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.reset = n, t.register = o, t.getEntry = a;
            var f = {},
                l = {}
        }),
        m = e(function(e, t) {
            "use strict";

            function r() {
                o = null
            }

            function n(e) {
                return o ? o[e] : (o = (0, v.getBetas)(), n(e))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.resetBetas = r, t["default"] = n;
            var o = null
        }),
        h = e(function(e, t) {
            "use strict";

            function l(e) {
                return -1 < c.indexOf(e)
            }

            function d(e) {
                return -1 < f.indexOf(e)
            }

            function r(e, t) {
                function r() {
                    c.push(s), a(), t(null, s)
                }

                function n() {
                    f.push(s), a(), t(new Error("load error: " + i))
                }

                function o() {
                    s.addEventListener("load", r), s.addEventListener("error", n)
                }

                function a() {
                    s.removeEventListener("load", r), s.removeEventListener("error", n)
                }
                var i = e.src,
                    u = e.props,
                    s = document.querySelector('script[src="' + i + '"]');
                s && l(s) ? r() : s && d(s) ? n() : s ? o() : (s = document.createElement("script"), Object.keys(u).forEach(function(e) {
                    s.setAttribute(e, u[e])
                }), null === s.getAttribute("defer") && s.setAttribute("defer", ""), s.src = i, s.crossorigin = "anonymous", o(), document.head.appendChild(s))
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r;
            var c = [],
                f = []
        }),
        i = e(function(e, t) {
            "use strict";

            function o(e, u, s) {
                return e.reduce(function(e, t) {
                    var r = t.onLoad || d["default"];
                    try {
                        var n = (0, p.getEntry)(t),
                            o = n.betaFlag,
                            a = !o || (0, l["default"])(o);
                        if (s && !a) throw (0, y.featureNotFound)(t);
                        a && e.push([n, t])
                    } catch (i) {
                        r(i), u.push(i)
                    }
                    return e
                }, [])
            }

            function a(e, o, a) {
                var i = e.length;
                0 !== i ? e.forEach(function(e) {
                    var t = s(e, 2),
                        r = t[0],
                        n = t[1];
                    (0, u["default"])(r, function(e, t) {
                        var r = n.onLoad || d["default"];
                        e && (r(e), o.push(e)), t && r(null), 0 === --i && a(o)
                    })
                }) : a(o)
            }

            function r(e, t, r) {
                var n = [];
                a(o(e, n, t), n, function(e) {
                    var t = 0 === e.length ? null : e;
                    r(t)
                })
            }

            function n(e, t) {
                r(e, !0, t)
            }

            function i(e, t) {
                r(e, !1, t)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.loadMultiple = r, t.loadMultipleErrorIfNotInBeta = n, t.loadMultipleSilentIfNotInBeta = i;
            var l = c(m),
                d = c(f),
                u = c(h)
        }),
        g = e(function(e, t) {
            "use strict";

            function r(e) {
                var t = e || n["default"];
                (0, i.loadMultipleSilentIfNotInBeta)(o.getFeatures(), t)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.lookup = undefined, t["default"] = r;
            var n = c(f),
                o = (0, c(a)["default"])();
            t.lookup = o
        }),
        d = e(function(e, t) {
            "use strict";

            function r(e) {
                var t = e.name,
                    r = e.version,
                    n = e.legacy,
                    o = e.baseName,
                    a = o === undefined ? null : o,
                    i = e.locale,
                    u = i === undefined ? null : i,
                    s = e.fileName,
                    l = a || t,
                    d = (s === undefined ? null : s) || l;
                return n && (d += "-legacy"), u && (d = d + "." + u), "https://" + (window.Shopify && window.Shopify.cdnHost || "cdn.shopify.com") + "/shopifycloud/" + l + "/v" + r + "/" + d + ".js"
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t.urlForFeature = r
        }),
        l = e(function(e, t) {
            "use strict";

            function r(e) {
                if (!e || "string" != typeof e.name || "string" != typeof e.version) throw (0, y.invalidFeature)(e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r
        }),
        b = e(function(e, t) {
            "use strict";

            function r(e, t) {
                var r = t || o["default"];
                if (Array.isArray(e)) return e.forEach(n["default"]), void(0, i.loadMultipleErrorIfNotInBeta)(e, r);
                throw (0, y.invalidFeaturesArray)(e)
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r;
            var n = c(l),
                o = c(f)
        }),
        w = e(function(e, t) {
            "use strict";

            function r(n) {
                var e = null;
                return {
                    get isObserving() {
                        return Boolean(e)
                    },
                    enable: function t() {
                        this.isObserving || (e = new MutationObserver(function(e) {
                            for (var t = !1, r = 0; r < e.length; r++)
                                if (e[r].addedNodes.length) {
                                    t = !0;
                                    break
                                } t && n()
                        })).observe(document.body, {
                            childList: !0,
                            subtree: !0
                        })
                    },
                    disable: function r() {
                        this.isObserving && (e.disconnect(), e = null)
                    }
                }
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r
        }),
        _ = e(function(e, t) {
            "use strict";

            function r(e, t) {
                var r = window.Shopify[e] && window.Shopify[e].q;
                r && Array.isArray(r) && r.forEach(function(e) {
                    t.apply(undefined, n(e))
                }), window.Shopify[e] = t
            }
            Object.defineProperty(t, "__esModule", {
                value: !0
            }), t["default"] = r
        });
    e(function(e, t) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        }), t.resetRegistry = t.resetBetas = t.register = undefined;
        var r = c(u),
            n = c(b),
            o = c(g),
            a = c(w),
            i = c(_);
        t.register = p.register, t.resetBetas = m.resetBetas, t.resetRegistry = p.reset, window.Shopify = window.Shopify || {}, (0, p.register)({
            name: "model-viewer",
            version: "0.6",
            hasLegacy: !0,
            autoLoadSelector: 'model-viewer[data-shopify-feature="0.6"]'
        }), (0, p.register)({
            name: "model-viewer",
            version: "0.7",
            hasLegacy: !0,
            autoLoadSelector: 'model-viewer[data-shopify-feature="0.7"]'
        }), (0, p.register)({
            name: "model-viewer",
            version: "0.8",
            hasLegacy: !0,
            autoLoadSelector: 'model-viewer[data-shopify-feature="0.8"]'
        }), (0, p.register)({
            name: "model-viewer",
            version: "1.2",
            hasLegacy: !0,
            autoLoadSelector: 'model-viewer[data-shopify-feature="1.2"]'
        }), (0, p.register)({
            name: "payment-terms-ui",
            version: "0.1",
            hasLegacy: !1,
            localized: !1,
            autoLoadSelector: "shopify-payment-terms"
        }), (0, p.register)({
            name: "model-viewer-ui",
            version: "1.0",
            hasLegacy: !0,
            localized: !0
        }), (0, p.register)({
            name: "shopify-xr",
            version: "1.0",
            baseName: "shopify-xr-js",
            fileName: "shopify-xr",
            localized: !0
        }), (0, p.register)({
            name: "video-ui",
            baseName: "shopify-plyr",
            version: "1.0",
            hasLegacy: !0,
            localized: !0
        }), (0, p.register)({
            name: "video-ui",
            baseName: "shopify-plyr",
            version: "1.1",
            hasLegacy: !0,
            localized: !0
        }), (0, p.register)({
            name: "video-ui",
            baseName: "plyr",
            version: "2.0",
            hasLegacy: !0,
            localized: !0,
            fileName: "shopify-plyr"
        }), (0, p.register)({
            name: "media-analytics",
            version: "0.1",
            hasLegacy: !0,
            fileName: "analytics",
            betaFlag: "rich-media-storefront-analytics",
            autoLoadSelector: ["video", "model-viewer", 'a[rel="ar"]', 'a[href*="package=com.google.ar.core;action=android.intent.action.VIEW;"]', "[data-shopify-xr]", 'iframe[src^="https://www.youtube.com/embed/"]', 'iframe[src^="https://player.vimeo.com/video/"]']
        }), (0, p.register)({
            name: "consent-tracking-api",
            version: "0.1",
            hasLegacy: !0
        }), (0, r["default"])(function() {
            function e() {
                (0, o["default"])(function(e) {
                    if (e) throw e[0]
                })
            }(0, i["default"])("loadFeatures", n["default"]), (0, i["default"])("autoloadFeatures", o["default"]), e(), (0, a["default"])(e).enable()
        })
    })
}("undefined" != typeof global ? global : "undefined" != typeof window && window);