/*! For license information please see app.min.js.LICENSE.txt */
(() => {
  var t = {
      2: function (t, e, s) {
        var i, n;
        window.Element &&
          !Element.prototype.closest &&
          (Element.prototype.closest = function (t) {
            var e,
              s = (this.document || this.ownerDocument).querySelectorAll(t),
              i = this;
            do {
              for (e = s.length; 0 <= --e && s.item(e) !== i; );
            } while (e < 0 && (i = i.parentElement));
            return i;
          }),
          (function () {
            function t(t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: void 0 };
              var s = document.createEvent("CustomEvent");
              return s.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), s;
            }
            "function" != typeof window.CustomEvent &&
              ((t.prototype = window.Event.prototype),
              (window.CustomEvent = t));
          })(),
          (function () {
            for (
              var t = 0, e = ["ms", "moz", "webkit", "o"], s = 0;
              s < e.length && !window.requestAnimationFrame;
              ++s
            )
              (window.requestAnimationFrame =
                window[e[s] + "RequestAnimationFrame"]),
                (window.cancelAnimationFrame =
                  window[e[s] + "CancelAnimationFrame"] ||
                  window[e[s] + "CancelRequestAnimationFrame"]);
            window.requestAnimationFrame ||
              (window.requestAnimationFrame = function (e, s) {
                var i = new Date().getTime(),
                  n = Math.max(0, 16 - (i - t)),
                  a = window.setTimeout(function () {
                    e(i + n);
                  }, n);
                return (t = i + n), a;
              }),
              window.cancelAnimationFrame ||
                (window.cancelAnimationFrame = function (t) {
                  clearTimeout(t);
                });
          })(),
          (n =
            void 0 !== s.g
              ? s.g
              : "undefined" != typeof window
              ? window
              : this),
          (i = function () {
            return (function (t) {
              "use strict";
              var e = {
                  ignore: "[data-scroll-ignore]",
                  header: null,
                  topOnEmptyHash: !0,
                  speed: 500,
                  speedAsDuration: !1,
                  durationMax: null,
                  durationMin: null,
                  clip: !0,
                  offset: 0,
                  easing: "easeInOutCubic",
                  customEasing: null,
                  updateURL: !0,
                  popstate: !0,
                  emitEvents: !0,
                },
                s = function () {
                  var t = {};
                  return (
                    Array.prototype.forEach.call(arguments, function (e) {
                      for (var s in e) {
                        if (!e.hasOwnProperty(s)) return;
                        t[s] = e[s];
                      }
                    }),
                    t
                  );
                },
                i = function (t) {
                  "#" === t.charAt(0) && (t = t.substr(1));
                  for (
                    var e,
                      s = String(t),
                      i = s.length,
                      n = -1,
                      a = "",
                      l = s.charCodeAt(0);
                    ++n < i;

                  ) {
                    if (0 === (e = s.charCodeAt(n)))
                      throw new InvalidCharacterError(
                        "Invalid character: the input contains U+0000."
                      );
                    a +=
                      (1 <= e && e <= 31) ||
                      127 == e ||
                      (0 === n && 48 <= e && e <= 57) ||
                      (1 === n && 48 <= e && e <= 57 && 45 === l)
                        ? "\\" + e.toString(16) + " "
                        : 128 <= e ||
                          45 === e ||
                          95 === e ||
                          (48 <= e && e <= 57) ||
                          (65 <= e && e <= 90) ||
                          (97 <= e && e <= 122)
                        ? s.charAt(n)
                        : "\\" + s.charAt(n);
                  }
                  return "#" + a;
                },
                n = function () {
                  return Math.max(
                    document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight,
                    document.documentElement.offsetHeight,
                    document.body.clientHeight,
                    document.documentElement.clientHeight
                  );
                },
                a = function (e) {
                  return e
                    ? ((s = e),
                      parseInt(t.getComputedStyle(s).height, 10) + e.offsetTop)
                    : 0;
                  var s;
                },
                l = function (e, s, i) {
                  0 === e && document.body.focus(),
                    i ||
                      (e.focus(),
                      document.activeElement !== e &&
                        (e.setAttribute("tabindex", "-1"),
                        e.focus(),
                        (e.style.outline = "none")),
                      t.scrollTo(0, s));
                },
                r = function (e, s, i, n) {
                  if (s.emitEvents && "function" == typeof t.CustomEvent) {
                    var a = new CustomEvent(e, {
                      bubbles: !0,
                      detail: { anchor: i, toggle: n },
                    });
                    document.dispatchEvent(a);
                  }
                };
              return function (o, d) {
                var c,
                  u,
                  h,
                  p,
                  m = {
                    cancelScroll: function (t) {
                      cancelAnimationFrame(p),
                        (p = null),
                        t || r("scrollCancel", c);
                    },
                    animateScroll: function (i, o, d) {
                      m.cancelScroll();
                      var u = s(c || e, d || {}),
                        g =
                          "[object Number]" ===
                          Object.prototype.toString.call(i),
                        f = g || !i.tagName ? null : i;
                      if (g || f) {
                        var v = t.pageYOffset;
                        u.header &&
                          !h &&
                          (h = document.querySelector(u.header));
                        var b,
                          y,
                          w,
                          S,
                          C,
                          T,
                          x,
                          E,
                          _ = a(h),
                          I = g
                            ? i
                            : (function (e, s, i, a) {
                                var l = 0;
                                if (e.offsetParent)
                                  for (
                                    ;
                                    (l += e.offsetTop), (e = e.offsetParent);

                                  );
                                return (
                                  (l = Math.max(l - s - i, 0)),
                                  a && (l = Math.min(l, n() - t.innerHeight)),
                                  l
                                );
                              })(
                                f,
                                _,
                                parseInt(
                                  "function" == typeof u.offset
                                    ? u.offset(i, o)
                                    : u.offset,
                                  10
                                ),
                                u.clip
                              ),
                          L = I - v,
                          $ = n(),
                          k = 0,
                          A =
                            ((b = L),
                            (w = (y = u).speedAsDuration
                              ? y.speed
                              : Math.abs((b / 1e3) * y.speed)),
                            y.durationMax && w > y.durationMax
                              ? y.durationMax
                              : y.durationMin && w < y.durationMin
                              ? y.durationMin
                              : parseInt(w, 10)),
                          O = function (e) {
                            var s, n, a;
                            S || (S = e),
                              (k += e - S),
                              (T =
                                v +
                                L *
                                  ((n = C =
                                    1 < (C = 0 === A ? 0 : k / A) ? 1 : C),
                                  "easeInQuad" === (s = u).easing &&
                                    (a = n * n),
                                  "easeOutQuad" === s.easing &&
                                    (a = n * (2 - n)),
                                  "easeInOutQuad" === s.easing &&
                                    (a =
                                      n < 0.5
                                        ? 2 * n * n
                                        : (4 - 2 * n) * n - 1),
                                  "easeInCubic" === s.easing && (a = n * n * n),
                                  "easeOutCubic" === s.easing &&
                                    (a = --n * n * n + 1),
                                  "easeInOutCubic" === s.easing &&
                                    (a =
                                      n < 0.5
                                        ? 4 * n * n * n
                                        : (n - 1) * (2 * n - 2) * (2 * n - 2) +
                                          1),
                                  "easeInQuart" === s.easing &&
                                    (a = n * n * n * n),
                                  "easeOutQuart" === s.easing &&
                                    (a = 1 - --n * n * n * n),
                                  "easeInOutQuart" === s.easing &&
                                    (a =
                                      n < 0.5
                                        ? 8 * n * n * n * n
                                        : 1 - 8 * --n * n * n * n),
                                  "easeInQuint" === s.easing &&
                                    (a = n * n * n * n * n),
                                  "easeOutQuint" === s.easing &&
                                    (a = 1 + --n * n * n * n * n),
                                  "easeInOutQuint" === s.easing &&
                                    (a =
                                      n < 0.5
                                        ? 16 * n * n * n * n * n
                                        : 1 + 16 * --n * n * n * n * n),
                                  s.customEasing && (a = s.customEasing(n)),
                                  a || n)),
                              t.scrollTo(0, Math.floor(T)),
                              (function (e, s) {
                                var n = t.pageYOffset;
                                if (
                                  e == s ||
                                  n == s ||
                                  (v < s && t.innerHeight + n) >= $
                                )
                                  return (
                                    m.cancelScroll(!0),
                                    l(i, s, g),
                                    r("scrollStop", u, i, o),
                                    !(p = S = null)
                                  );
                              })(T, I) ||
                                ((p = t.requestAnimationFrame(O)), (S = e));
                          };
                        0 === t.pageYOffset && t.scrollTo(0, 0),
                          (x = i),
                          (E = u),
                          g ||
                            (history.pushState &&
                              E.updateURL &&
                              history.pushState(
                                {
                                  smoothScroll: JSON.stringify(E),
                                  anchor: x.id,
                                },
                                document.title,
                                x === document.documentElement
                                  ? "#top"
                                  : "#" + x.id
                              )),
                          "matchMedia" in t &&
                          t.matchMedia("(prefers-reduced-motion)").matches
                            ? l(i, Math.floor(I), !1)
                            : (r("scrollStart", u, i, o),
                              m.cancelScroll(!0),
                              t.requestAnimationFrame(O));
                      }
                    },
                  },
                  g = function (e) {
                    if (
                      !e.defaultPrevented &&
                      !(
                        0 !== e.button ||
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey
                      ) &&
                      "closest" in e.target &&
                      (u = e.target.closest(o)) &&
                      "a" === u.tagName.toLowerCase() &&
                      !e.target.closest(c.ignore) &&
                      u.hostname === t.location.hostname &&
                      u.pathname === t.location.pathname &&
                      /#/.test(u.href)
                    ) {
                      var s, n;
                      try {
                        s = i(decodeURIComponent(u.hash));
                      } catch (e) {
                        s = i(u.hash);
                      }
                      if ("#" === s) {
                        if (!c.topOnEmptyHash) return;
                        n = document.documentElement;
                      } else n = document.querySelector(s);
                      (n = n || "#top" !== s ? n : document.documentElement) &&
                        (e.preventDefault(),
                        (function (e) {
                          if (
                            history.replaceState &&
                            e.updateURL &&
                            !history.state
                          ) {
                            var s = t.location.hash;
                            (s = s || ""),
                              history.replaceState(
                                {
                                  smoothScroll: JSON.stringify(e),
                                  anchor: s || t.pageYOffset,
                                },
                                document.title,
                                s || t.location.href
                              );
                          }
                        })(c),
                        m.animateScroll(n, u));
                    }
                  },
                  f = function (t) {
                    if (
                      null !== history.state &&
                      history.state.smoothScroll &&
                      history.state.smoothScroll === JSON.stringify(c)
                    ) {
                      var e = history.state.anchor;
                      ("string" == typeof e &&
                        e &&
                        !(e = document.querySelector(
                          i(history.state.anchor)
                        ))) ||
                        m.animateScroll(e, null, { updateURL: !1 });
                    }
                  };
                return (
                  (m.destroy = function () {
                    c &&
                      (document.removeEventListener("click", g, !1),
                      t.removeEventListener("popstate", f, !1),
                      m.cancelScroll(),
                      (p = h = u = c = null));
                  }),
                  (function () {
                    if (
                      !(
                        "querySelector" in document &&
                        "addEventListener" in t &&
                        "requestAnimationFrame" in t &&
                        "closest" in t.Element.prototype
                      )
                    )
                      throw "Smooth Scroll: This browser does not support the required JavaScript methods and browser APIs.";
                    m.destroy(),
                      (c = s(e, d || {})),
                      (h = c.header ? document.querySelector(c.header) : null),
                      document.addEventListener("click", g, !1),
                      c.updateURL &&
                        c.popstate &&
                        t.addEventListener("popstate", f, !1);
                  })(),
                  m
                );
              };
            })(n);
          }.apply(e, [])),
          void 0 === i || (t.exports = i);
      },
    },
    e = {};
  function s(i) {
    var n = e[i];
    if (void 0 !== n) return n.exports;
    var a = (e[i] = { exports: {} });
    return t[i].call(a.exports, a, a.exports, s), a.exports;
  }
  (s.g = (function () {
    if ("object" == typeof globalThis) return globalThis;
    try {
      return this || new Function("return this")();
    } catch (t) {
      if ("object" == typeof window) return window;
    }
  })()),
    (() => {
      "use strict";
      function t(t) {
        this.type = t;
      }
      (t.prototype.init = function () {
        const t = this;
        (this.оbjects = []),
          (this.daClassname = "_dynamic_adapt_"),
          (this.nodes = document.querySelectorAll("[data-da]"));
        for (let t = 0; t < this.nodes.length; t++) {
          const e = this.nodes[t],
            s = e.dataset.da.trim().split(","),
            i = {};
          (i.element = e),
            (i.parent = e.parentNode),
            (i.destination = document.querySelector(s[0].trim())),
            (i.breakpoint = s[1] ? s[1].trim() : "767"),
            (i.place = s[2] ? s[2].trim() : "last"),
            (i.index = this.indexInParent(i.parent, i.element)),
            this.оbjects.push(i);
        }
        this.arraySort(this.оbjects),
          (this.mediaQueries = Array.prototype.map.call(
            this.оbjects,
            function (t) {
              return (
                "(" +
                this.type +
                "-width: " +
                t.breakpoint +
                "px)," +
                t.breakpoint
              );
            },
            this
          )),
          (this.mediaQueries = Array.prototype.filter.call(
            this.mediaQueries,
            function (t, e, s) {
              return Array.prototype.indexOf.call(s, t) === e;
            }
          ));
        for (let e = 0; e < this.mediaQueries.length; e++) {
          const s = this.mediaQueries[e],
            i = String.prototype.split.call(s, ","),
            n = window.matchMedia(i[0]),
            a = i[1],
            l = Array.prototype.filter.call(this.оbjects, function (t) {
              return t.breakpoint === a;
            });
          n.addListener(function () {
            t.mediaHandler(n, l);
          }),
            this.mediaHandler(n, l);
        }
      }),
        (t.prototype.mediaHandler = function (t, e) {
          if (t.matches)
            for (let t = 0; t < e.length; t++) {
              const s = e[t];
              (s.index = this.indexInParent(s.parent, s.element)),
                this.moveTo(s.place, s.element, s.destination);
            }
          else
            for (let t = e.length - 1; t >= 0; t--) {
              const s = e[t];
              s.element.classList.contains(this.daClassname) &&
                this.moveBack(s.parent, s.element, s.index);
            }
        }),
        (t.prototype.moveTo = function (t, e, s) {
          e.classList.add(this.daClassname),
            "last" === t || t >= s.children.length
              ? s.insertAdjacentElement("beforeend", e)
              : "first" !== t
              ? s.children[t].insertAdjacentElement("beforebegin", e)
              : s.insertAdjacentElement("afterbegin", e);
        }),
        (t.prototype.moveBack = function (t, e, s) {
          e.classList.remove(this.daClassname),
            void 0 !== t.children[s]
              ? t.children[s].insertAdjacentElement("beforebegin", e)
              : t.insertAdjacentElement("beforeend", e);
        }),
        (t.prototype.indexInParent = function (t, e) {
          const s = Array.prototype.slice.call(t.children);
          return Array.prototype.indexOf.call(s, e);
        }),
        (t.prototype.arraySort = function (t) {
          "min" === this.type
            ? Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? -1
                    : "last" === t.place || "first" === e.place
                    ? 1
                    : t.place - e.place
                  : t.breakpoint - e.breakpoint;
              })
            : Array.prototype.sort.call(t, function (t, e) {
                return t.breakpoint === e.breakpoint
                  ? t.place === e.place
                    ? 0
                    : "first" === t.place || "last" === e.place
                    ? 1
                    : "last" === t.place || "first" === e.place
                    ? -1
                    : e.place - t.place
                  : e.breakpoint - t.breakpoint;
              });
        });
      new t("max").init();
      let e = {
        Android: function () {
          return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
          return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
          return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
          return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
          return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
          return (
            e.Android() || e.BlackBerry() || e.iOS() || e.Opera() || e.Windows()
          );
        },
      };
      let i = (t, e = 500, s = 0) => {
          t.classList.contains("_slide") ||
            (t.classList.add("_slide"),
            (t.style.transitionProperty = "height, margin, padding"),
            (t.style.transitionDuration = e + "ms"),
            (t.style.height = `${t.offsetHeight}px`),
            t.offsetHeight,
            (t.style.overflow = "hidden"),
            (t.style.height = s ? `${s}px` : "0px"),
            (t.style.paddingTop = 0),
            (t.style.paddingBottom = 0),
            (t.style.marginTop = 0),
            (t.style.marginBottom = 0),
            window.setTimeout(() => {
              (t.hidden = !s),
                !s && t.style.removeProperty("height"),
                t.style.removeProperty("padding-top"),
                t.style.removeProperty("padding-bottom"),
                t.style.removeProperty("margin-top"),
                t.style.removeProperty("margin-bottom"),
                !s && t.style.removeProperty("overflow"),
                t.style.removeProperty("transition-duration"),
                t.style.removeProperty("transition-property"),
                t.classList.remove("_slide");
            }, e));
        },
        n = (t, e = 500, s = 0) => {
          if (!t.classList.contains("_slide")) {
            t.classList.add("_slide"),
              (t.hidden = !t.hidden && null),
              s && t.style.removeProperty("height");
            let i = t.offsetHeight;
            (t.style.overflow = "hidden"),
              (t.style.height = s ? `${s}px` : "0px"),
              (t.style.paddingTop = 0),
              (t.style.paddingBottom = 0),
              (t.style.marginTop = 0),
              (t.style.marginBottom = 0),
              t.offsetHeight,
              (t.style.transitionProperty = "height, margin, padding"),
              (t.style.transitionDuration = e + "ms"),
              (t.style.height = i + "px"),
              t.style.removeProperty("padding-top"),
              t.style.removeProperty("padding-bottom"),
              t.style.removeProperty("margin-top"),
              t.style.removeProperty("margin-bottom"),
              window.setTimeout(() => {
                t.style.removeProperty("height"),
                  t.style.removeProperty("overflow"),
                  t.style.removeProperty("transition-duration"),
                  t.style.removeProperty("transition-property"),
                  t.classList.remove("_slide");
              }, e);
          }
        },
        a = (t, e = 500) => (t.hidden ? n(t, e) : i(t, e)),
        l = !0,
        r = (t = 500) => {
          document.documentElement.classList.contains("lock") ? o(t) : d(t);
        },
        o = (t = 500) => {
          let e = document.querySelector("body");
          if (l) {
            let s = document.querySelectorAll("[data-lp]");
            setTimeout(() => {
              for (let t = 0; t < s.length; t++) {
                s[t].style.paddingRight = "0px";
              }
              (e.style.paddingRight = "0px"),
                document.documentElement.classList.remove("lock");
            }, t),
              (l = !1),
              setTimeout(function () {
                l = !0;
              }, t);
          }
        },
        d = (t = 500) => {
          let e = document.querySelector("body");
          if (l) {
            let s = document.querySelectorAll("[data-lp]");
            for (let t = 0; t < s.length; t++) {
              s[t].style.paddingRight =
                window.innerWidth -
                document.querySelector(".wrapper").offsetWidth +
                "px";
            }
            (e.style.paddingRight =
              window.innerWidth -
              document.querySelector(".wrapper").offsetWidth +
              "px"),
              document.documentElement.classList.add("lock"),
              (l = !1),
              setTimeout(function () {
                l = !0;
              }, t);
          }
        };
      function c() {
        const t = document.querySelectorAll("[data-tabs]");
        let e = [];
        if (t.length > 0) {
          const i = location.hash.replace("#", "");
          i.startsWith("tab-") && (e = i.replace("tab-", "").split("-")),
            t.forEach((t, s) => {
              t.classList.add("_tab-init"),
                t.setAttribute("data-tabs-index", s),
                t.addEventListener("click", a),
                (function (t) {
                  const s = t.querySelectorAll("[data-tabs-titles]>*"),
                    i = t.querySelectorAll("[data-tabs-body]>*"),
                    n = t.dataset.tabsIndex,
                    a = e[0] == n;
                  if (a) {
                    t.querySelector(
                      "[data-tabs-titles]>._tab-active"
                    ).classList.remove("_tab-active");
                  }
                  i.length > 0 &&
                    i.forEach((t, i) => {
                      s[i].setAttribute("data-tabs-title", ""),
                        t.setAttribute("data-tabs-item", ""),
                        a && i == e[1] && s[i].classList.add("_tab-active"),
                        (t.hidden = !s[i].classList.contains("_tab-active"));
                    });
                })(t);
            });
          let n = p(t, "tabs");
          n &&
            n.length &&
            n.forEach((t) => {
              t.matchMedia.addEventListener("change", function () {
                s(t.itemsArray, t.matchMedia);
              }),
                s(t.itemsArray, t.matchMedia);
            });
        }
        function s(t, e) {
          t.forEach((t) => {
            const s = (t = t.item).querySelector("[data-tabs-titles]"),
              i = t.querySelectorAll("[data-tabs-title]"),
              n = t.querySelector("[data-tabs-body]");
            t.querySelectorAll("[data-tabs-item]").forEach((a, l) => {
              e.matches
                ? (n.append(i[l]), n.append(a), t.classList.add("_tab-spoller"))
                : (s.append(i[l]), t.classList.remove("_tab-spoller"));
            });
          });
        }
        function a(t) {
          const e = t.target;
          if (e.closest("[data-tabs-title]")) {
            const s = e.closest("[data-tabs-title]"),
              a = s.closest("[data-tabs]");
            if (
              !s.classList.contains("_tab-active") &&
              !a.querySelectorAll("._slide").length
            ) {
              const t = a.querySelector("[data-tabs-title]._tab-active");
              t && t.classList.remove("_tab-active"),
                s.classList.add("_tab-active"),
                (function (t) {
                  const e = t.querySelectorAll("[data-tabs-title]"),
                    s = t.querySelectorAll("[data-tabs-item]"),
                    a = t.dataset.tabsIndex,
                    l = (function (t) {
                      if (t.hasAttribute("data-tabs-animate"))
                        return t.dataset.tabsAnimate > 0
                          ? t.dataset.tabsAnimate
                          : 500;
                    })(t);
                  s.length > 0 &&
                    s.forEach((t, s) => {
                      e[s].classList.contains("_tab-active")
                        ? (l ? n(t, l) : (t.hidden = !1),
                          t.closest(".popup") ||
                            (location.hash = `tab-${a}-${s}`))
                        : l
                        ? i(t, l)
                        : (t.hidden = !0);
                    });
                })(a);
            }
            t.preventDefault();
          }
        }
      }
      function u() {
        o(), document.documentElement.classList.remove("cart-open");
      }
      !(function () {
        let t = document.querySelector(".cart__icon");
        t &&
          t.addEventListener("click", function (t) {
            l && (r(), document.documentElement.classList.toggle("cart-open"));
          });
      })(),
        document.addEventListener("click", function (t) {
          (t.target.classList.contains("wrapper") ||
            t.target.closest(".cart__close")) &&
            u();
        });
      function h(t) {
        setTimeout(() => {
          window.FLS;
        }, 0);
      }
      function p(t, e) {
        const s = Array.from(t).filter(function (t, s, i) {
          if (t.dataset[e]) return t.dataset[e].split(",")[0];
        });
        if (s.length) {
          const t = [];
          s.forEach((s) => {
            const i = {},
              n = s.dataset[e].split(",");
            (i.value = n[0]),
              (i.type = n[1] ? n[1].trim() : "max"),
              (i.item = s),
              t.push(i);
          });
          let i = t.map(function (t) {
            return (
              "(" +
              t.type +
              "-width: " +
              t.value +
              "px)," +
              t.value +
              "," +
              t.type
            );
          });
          i = (function (t) {
            return t.filter(function (t, e, s) {
              return s.indexOf(t) === e;
            });
          })(i);
          const n = [];
          if (i.length)
            return (
              i.forEach((e) => {
                const s = e.split(","),
                  i = s[1],
                  a = s[2],
                  l = window.matchMedia(s[0]),
                  r = t.filter(function (t) {
                    if (t.value === i && t.type === a) return !0;
                  });
                n.push({ itemsArray: r, matchMedia: l });
              }),
              n
            );
        }
      }
      var m = s(2);
      let g = (t, e = !1, s = 500, i = 0) => {
        const n = document.querySelector(t);
        if (n) {
          let t = "",
            a = 0;
          e &&
            ((t = "header.header"),
            (a = document.querySelector(t).offsetHeight));
          let l = {
            speedAsDuration: !0,
            speed: s,
            header: t,
            offset: i,
            easing: "easeOutQuad",
          };
          if (
            (document.documentElement.classList.contains("menu-open") &&
              (o(), document.documentElement.classList.remove("menu-open")),
            void 0 !== m)
          )
            new m().animateScroll(n, "", l);
          else {
            let t = n.getBoundingClientRect().top + scrollY;
            window.scrollTo({ top: a ? t - a : t, behavior: "smooth" });
          }
          h();
        } else h();
      };
      class f {
        constructor(t, e = null) {
          if (
            ((this.config = Object.assign({ init: !0, logging: !0 }, t)),
            (this.selectClasses = {
              classSelect: "select",
              classSelectBody: "select__body",
              classSelectTitle: "select__title",
              classSelectValue: "select__value",
              classSelectLabel: "select__label",
              classSelectInput: "select__input",
              classSelectText: "select__text",
              classSelectLink: "select__link",
              classSelectOptions: "select__options",
              classSelectOptionsScroll: "select__scroll",
              classSelectOption: "select__option",
              classSelectContent: "select__content",
              classSelectRow: "select__row",
              classSelectData: "select__asset",
              classSelectDisabled: "_select-disabled",
              classSelectTag: "_select-tag",
              classSelectOpen: "_select-open",
              classSelectActive: "_select-active",
              classSelectFocus: "_select-focus",
              classSelectMultiple: "_select-multiple",
              classSelectCheckBox: "_select-checkbox",
              classSelectOptionSelected: "_select-selected",
            }),
            (this._this = this),
            this.config.init)
          ) {
            const t = e
              ? document.querySelectorAll(e)
              : document.querySelectorAll("select");
            t.length
              ? (this.selectsInit(t),
                this.setLogging(`Проснулся, построил селектов: (${t.length})`))
              : this.setLogging("Сплю, нет ни одного select zzZZZzZZz");
          }
        }
        getSelectClass(t) {
          return `.${t}`;
        }
        getSelectElement(t, e) {
          return {
            originalSelect: t.querySelector("select"),
            selectElement: t.querySelector(this.getSelectClass(e)),
          };
        }
        selectsInit(t) {
          t.forEach((t, e) => {
            this.selectInit(t, e + 1);
          }),
            document.addEventListener(
              "click",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            ),
            document.addEventListener(
              "keydown",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            ),
            document.addEventListener(
              "focusin",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            ),
            document.addEventListener(
              "focusout",
              function (t) {
                this.selectsActions(t);
              }.bind(this)
            );
        }
        selectInit(t, e) {
          const s = this;
          let i = document.createElement("div");
          if (
            (i.classList.add(this.selectClasses.classSelect),
            t.parentNode.insertBefore(i, t),
            i.appendChild(t),
            (t.hidden = !0),
            e && (t.dataset.id = e),
            i.insertAdjacentHTML(
              "beforeend",
              `<div class="${this.selectClasses.classSelectBody}"><div hidden class="${this.selectClasses.classSelectOptions}"></div></div>`
            ),
            this.selectBuild(t),
            this.getSelectPlaceholder(t) &&
              ((t.dataset.placeholder = this.getSelectPlaceholder(t).value),
              this.getSelectPlaceholder(t).label.show))
          ) {
            this.getSelectElement(
              i,
              this.selectClasses.classSelectTitle
            ).selectElement.insertAdjacentHTML(
              "afterbegin",
              `<span class="${this.selectClasses.classSelectLabel}">${
                this.getSelectPlaceholder(t).label.text
                  ? this.getSelectPlaceholder(t).label.text
                  : this.getSelectPlaceholder(t).value
              }</span>`
            );
          }
          (t.dataset.speed = t.dataset.speed ? t.dataset.speed : "150"),
            t.addEventListener("change", function (t) {
              s.selectChange(t);
            });
        }
        selectBuild(t) {
          const e = t.parentElement;
          (e.dataset.id = t.dataset.id),
            e.classList.add(
              t.getAttribute("class") ? `select_${t.getAttribute("class")}` : ""
            ),
            t.multiple
              ? e.classList.add(this.selectClasses.classSelectMultiple)
              : e.classList.remove(this.selectClasses.classSelectMultiple),
            t.hasAttribute("data-checkbox") && t.multiple
              ? e.classList.add(this.selectClasses.classSelectCheckBox)
              : e.classList.remove(this.selectClasses.classSelectCheckBox),
            this.setSelectTitleValue(e, t),
            this.setOptions(e, t),
            t.hasAttribute("data-search") && this.searchActions(e),
            t.hasAttribute("data-open") && this.selectAction(e),
            this.selectDisabled(e, t);
        }
        selectsActions(t) {
          const e = t.target,
            s = t.type;
          if (
            e.closest(this.getSelectClass(this.selectClasses.classSelect)) ||
            e.closest(this.getSelectClass(this.selectClasses.classSelectTag))
          ) {
            const i = e.closest(".select")
                ? e.closest(".select")
                : document.querySelector(
                    `.${this.selectClasses.classSelect}[data-id="${
                      e.closest(
                        this.getSelectClass(this.selectClasses.classSelectTag)
                      ).dataset.selectId
                    }"]`
                  ),
              n = this.getSelectElement(i).originalSelect;
            if ("click" === s) {
              if (!n.disabled)
                if (
                  e.closest(
                    this.getSelectClass(this.selectClasses.classSelectTag)
                  )
                ) {
                  const t = e.closest(
                      this.getSelectClass(this.selectClasses.classSelectTag)
                    ),
                    s = document.querySelector(
                      `.${this.selectClasses.classSelect}[data-id="${t.dataset.selectId}"] .select__option[data-value="${t.dataset.value}"]`
                    );
                  this.optionAction(i, n, s);
                } else if (
                  e.closest(
                    this.getSelectClass(this.selectClasses.classSelectTitle)
                  )
                )
                  this.selectAction(i);
                else if (
                  e.closest(
                    this.getSelectClass(this.selectClasses.classSelectOption)
                  )
                ) {
                  const t = e.closest(
                    this.getSelectClass(this.selectClasses.classSelectOption)
                  );
                  this.optionAction(i, n, t);
                }
            } else
              "focusin" === s || "focusout" === s
                ? e.closest(
                    this.getSelectClass(this.selectClasses.classSelect)
                  ) &&
                  ("focusin" === s
                    ? i.classList.add(this.selectClasses.classSelectFocus)
                    : i.classList.remove(this.selectClasses.classSelectFocus))
                : "keydown" === s && "Escape" === t.code && this.selectsСlose();
          } else this.selectsСlose();
        }
        selectsСlose() {
          const t = document.querySelectorAll(
            `${this.getSelectClass(
              this.selectClasses.classSelect
            )}${this.getSelectClass(this.selectClasses.classSelectOpen)}`
          );
          t.length &&
            t.forEach((t) => {
              this.selectAction(t);
            });
        }
        selectAction(t) {
          const e = this.getSelectElement(t).originalSelect,
            s = this.getSelectElement(
              t,
              this.selectClasses.classSelectOptions
            ).selectElement;
          s.classList.contains("_slide") ||
            (t.classList.toggle(this.selectClasses.classSelectOpen),
            a(s, e.dataset.speed));
        }
        setSelectTitleValue(t, e) {
          const s = this.getSelectElement(
              t,
              this.selectClasses.classSelectBody
            ).selectElement,
            i = this.getSelectElement(
              t,
              this.selectClasses.classSelectTitle
            ).selectElement;
          i && i.remove(),
            s.insertAdjacentHTML("afterbegin", this.getSelectTitleValue(t, e));
        }
        getSelectTitleValue(t, e) {
          let s = this.getSelectedOptionsData(e, 2).html;
          if (
            (e.multiple &&
              e.hasAttribute("data-tags") &&
              ((s = this.getSelectedOptionsData(e)
                .elements.map(
                  (e) =>
                    `<span role="button" data-select-id="${
                      t.dataset.id
                    }" data-value="${
                      e.value
                    }" class="_select-tag">${this.getSelectElementContent(
                      e
                    )}</span>`
                )
                .join("")),
              e.dataset.tags &&
                document.querySelector(e.dataset.tags) &&
                ((document.querySelector(e.dataset.tags).innerHTML = s),
                e.hasAttribute("data-search") && (s = !1))),
            (s = s.length ? s : e.dataset.placeholder),
            this.getSelectedOptionsData(e).values.length
              ? t.classList.add(this.selectClasses.classSelectActive)
              : t.classList.remove(this.selectClasses.classSelectActive),
            e.hasAttribute("data-search"))
          )
            return `<div class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><input autocomplete="off" type="text" placeholder="${s}" data-placeholder="${s}" class="${this.selectClasses.classSelectInput}"></span></div>`;
          {
            const t =
              this.getSelectedOptionsData(e).elements.length &&
              this.getSelectedOptionsData(e).elements[0].dataset.class
                ? ` ${this.getSelectedOptionsData(e).elements[0].dataset.class}`
                : "";
            return `<button type="button" class="${this.selectClasses.classSelectTitle}"><span class="${this.selectClasses.classSelectValue}"><span class="${this.selectClasses.classSelectContent}${t}">${s}</span></span></button>`;
          }
        }
        getSelectElementContent(t) {
          const e = t.dataset.asset ? `${t.dataset.asset}` : "",
            s = e.indexOf("img") >= 0 ? `<img src="${e}" alt="">` : e;
          let i = "";
          return (
            (i += e
              ? `<span class="${this.selectClasses.classSelectRow}">`
              : ""),
            (i += e
              ? `<span class="${this.selectClasses.classSelectData}">`
              : ""),
            (i += e ? s : ""),
            (i += e ? "</span>" : ""),
            (i += e
              ? `<span class="${this.selectClasses.classSelectText}">`
              : ""),
            (i += t.textContent),
            (i += e ? "</span>" : ""),
            (i += e ? "</span>" : ""),
            i
          );
        }
        getSelectPlaceholder(t) {
          const e = Array.from(t.options).find((t) => !t.value);
          if (e)
            return {
              value: e.textContent,
              show: e.hasAttribute("data-show"),
              label: {
                show: e.hasAttribute("data-label"),
                text: e.dataset.label,
              },
            };
        }
        getSelectedOptionsData(t, e) {
          let s = [];
          return (
            t.multiple
              ? (s = Array.from(t.options)
                  .filter((t) => t.value)
                  .filter((t) => t.selected))
              : s.push(t.options[t.selectedIndex]),
            {
              elements: s.map((t) => t),
              values: s.filter((t) => t.value).map((t) => t.value),
              html: s.map((t) => this.getSelectElementContent(t)),
            }
          );
        }
        getOptions(t) {
          let e = t.hasAttribute("data-scroll") ? "data-simplebar" : "",
            s = t.dataset.scroll
              ? `style="max-height:${t.dataset.scroll}px"`
              : "",
            i = Array.from(t.options);
          if (i.length > 0) {
            let n = "";
            return (
              ((this.getSelectPlaceholder(t) &&
                !this.getSelectPlaceholder(t).show) ||
                t.multiple) &&
                (i = i.filter((t) => t.value)),
              (n += e
                ? `<div ${e} ${s} class="${this.selectClasses.classSelectOptionsScroll}">`
                : ""),
              i.forEach((e) => {
                n += this.getOption(e, t);
              }),
              (n += e ? "</div>" : ""),
              n
            );
          }
        }
        getOption(t, e) {
          const s =
              t.selected && e.multiple
                ? ` ${this.selectClasses.classSelectOptionSelected}`
                : "",
            i =
              t.selected && !e.hasAttribute("data-show-selected")
                ? "hidden"
                : "",
            n = t.dataset.class ? ` ${t.dataset.class}` : "",
            a = !!t.dataset.href && t.dataset.href,
            l = t.hasAttribute("data-href-blank") ? 'target="_blank"' : "";
          let r = "";
          return (
            (r += a
              ? `<a ${l} ${i} href="${a}" data-value="${t.value}" class="${this.selectClasses.classSelectOption}${n}${s}">`
              : `<button ${i} class="${this.selectClasses.classSelectOption}${n}${s}" data-value="${t.value}" type="button">`),
            (r += this.getSelectElementContent(t)),
            (r += a ? "</a>" : "</button>"),
            r
          );
        }
        setOptions(t, e) {
          this.getSelectElement(
            t,
            this.selectClasses.classSelectOptions
          ).selectElement.innerHTML = this.getOptions(e);
        }
        optionAction(t, e, s) {
          if (e.multiple) {
            s.classList.toggle(this.selectClasses.classSelectOptionSelected);
            this.getSelectedOptionsData(e).elements.forEach((t) => {
              t.removeAttribute("selected");
            });
            t.querySelectorAll(
              this.getSelectClass(this.selectClasses.classSelectOptionSelected)
            ).forEach((t) => {
              e.querySelector(
                `option[value="${t.dataset.value}"]`
              ).setAttribute("selected", "selected");
            });
          } else
            e.hasAttribute("data-show-selected") ||
              (t.querySelector(
                `${this.getSelectClass(
                  this.selectClasses.classSelectOption
                )}[hidden]`
              ) &&
                (t.querySelector(
                  `${this.getSelectClass(
                    this.selectClasses.classSelectOption
                  )}[hidden]`
                ).hidden = !1),
              (s.hidden = !0)),
              (e.value = s.hasAttribute("data-value")
                ? s.dataset.value
                : s.textContent),
              this.selectAction(t);
          this.setSelectTitleValue(t, e), this.setSelectChange(e);
        }
        selectChange(t) {
          const e = t.target;
          this.selectBuild(e), this.setSelectChange(e);
        }
        setSelectChange(t) {
          if (
            (t.hasAttribute("data-validate") && b.validateInput(t),
            t.hasAttribute("data-submit") && t.value)
          ) {
            let e = document.createElement("button");
            (e.type = "submit"),
              t.closest("form").append(e),
              e.click(),
              e.remove();
          }
          const e = t.parentElement;
          this.selectCallback(e, t);
        }
        selectDisabled(t, e) {
          e.disabled
            ? (t.classList.add(this.selectClasses.classSelectDisabled),
              (this.getSelectElement(
                t,
                this.selectClasses.classSelectTitle
              ).selectElement.disabled = !0))
            : (t.classList.remove(this.selectClasses.classSelectDisabled),
              (this.getSelectElement(
                t,
                this.selectClasses.classSelectTitle
              ).selectElement.disabled = !1));
        }
        searchActions(t) {
          this.getSelectElement(t).originalSelect;
          const e = this.getSelectElement(
              t,
              this.selectClasses.classSelectInput
            ).selectElement,
            s = this.getSelectElement(
              t,
              this.selectClasses.classSelectOptions
            ).selectElement,
            i = s.querySelectorAll(`.${this.selectClasses.classSelectOption}`),
            n = this;
          e.addEventListener("input", function () {
            i.forEach((t) => {
              t.textContent.toUpperCase().indexOf(e.value.toUpperCase()) >= 0
                ? (t.hidden = !1)
                : (t.hidden = !0);
            }),
              !0 === s.hidden && n.selectAction(t);
          });
        }
        selectCallback(t, e) {
          document.dispatchEvent(
            new CustomEvent("selectCallback", { detail: { select: e } })
          );
        }
        setLogging(t) {
          this.config.logging && h();
        }
      }
      const v = { inputMaskModule: null, selectModule: null };
      let b = {
        getErrors(t) {
          let e = 0,
            s = t.querySelectorAll("*[data-required]");
          return (
            s.length &&
              s.forEach((t) => {
                (null === t.offsetParent && "SELECT" !== t.tagName) ||
                  t.disabled ||
                  (e += this.validateInput(t));
              }),
            e
          );
        },
        validateInput(t) {
          let e = 0;
          return (
            "email" === t.dataset.required
              ? ((t.value = t.value.replace(" ", "")),
                this.emailTest(t)
                  ? (this.addError(t), e++)
                  : this.removeError(t))
              : ("checkbox" !== t.type || t.checked) && t.value
              ? this.removeError(t)
              : (this.addError(t), e++),
            e
          );
        },
        addError(t) {
          t.classList.add("_form-error"),
            t.parentElement.classList.add("_form-error");
          let e = t.parentElement.querySelector(".form__error");
          e && t.parentElement.removeChild(e),
            t.dataset.error &&
              t.parentElement.insertAdjacentHTML(
                "beforeend",
                `<div class="form__error">${t.dataset.error}</div>`
              );
        },
        removeError(t) {
          t.classList.remove("_form-error"),
            t.parentElement.classList.remove("_form-error"),
            t.parentElement.querySelector(".form__error") &&
              t.parentElement.removeChild(
                t.parentElement.querySelector(".form__error")
              );
        },
        formClean(t) {
          t.reset(),
            setTimeout(() => {
              let e = t.querySelectorAll("input,textarea");
              for (let t = 0; t < e.length; t++) {
                const s = e[t];
                s.parentElement.classList.remove("_form-focus"),
                  s.classList.remove("_form-focus"),
                  b.removeError(s),
                  (s.value = s.dataset.placeholder);
              }
              let s = t.querySelectorAll(".checkbox__input");
              if (s.length > 0)
                for (let t = 0; t < s.length; t++) {
                  s[t].checked = !1;
                }
              if (v.selectModule) {
                let e = t.querySelectorAll(".select");
                if (e.length)
                  for (let t = 0; t < e.length; t++) {
                    const s = e[t].querySelector("select");
                    v.selectModule.selectBuild(s);
                  }
              }
            }, 0);
        },
        emailTest: (t) =>
          !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(t.value),
      };
      function y() {
        v.selectModule = new f({});
      }
      function w(t) {
        return (
          null !== t &&
          "object" == typeof t &&
          "constructor" in t &&
          t.constructor === Object
        );
      }
      function S(t = {}, e = {}) {
        Object.keys(e).forEach((s) => {
          void 0 === t[s]
            ? (t[s] = e[s])
            : w(e[s]) &&
              w(t[s]) &&
              Object.keys(e[s]).length > 0 &&
              S(t[s], e[s]);
        });
      }
      const C = {
        body: {},
        addEventListener() {},
        removeEventListener() {},
        activeElement: { blur() {}, nodeName: "" },
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        createEvent: () => ({ initEvent() {} }),
        createElement: () => ({
          children: [],
          childNodes: [],
          style: {},
          setAttribute() {},
          getElementsByTagName: () => [],
        }),
        createElementNS: () => ({}),
        importNode: () => null,
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
      };
      function T() {
        const t = "undefined" != typeof document ? document : {};
        return S(t, C), t;
      }
      const x = {
        document: C,
        navigator: { userAgent: "" },
        location: {
          hash: "",
          host: "",
          hostname: "",
          href: "",
          origin: "",
          pathname: "",
          protocol: "",
          search: "",
        },
        history: { replaceState() {}, pushState() {}, go() {}, back() {} },
        CustomEvent: function () {
          return this;
        },
        addEventListener() {},
        removeEventListener() {},
        getComputedStyle: () => ({ getPropertyValue: () => "" }),
        Image() {},
        Date() {},
        screen: {},
        setTimeout() {},
        clearTimeout() {},
        matchMedia: () => ({}),
        requestAnimationFrame: (t) =>
          "undefined" == typeof setTimeout ? (t(), null) : setTimeout(t, 0),
        cancelAnimationFrame(t) {
          "undefined" != typeof setTimeout && clearTimeout(t);
        },
      };
      function E() {
        const t = "undefined" != typeof window ? window : {};
        return S(t, x), t;
      }
      class _ extends Array {
        constructor(t) {
          "number" == typeof t
            ? super(t)
            : (super(...(t || [])),
              (function (t) {
                const e = t.__proto__;
                Object.defineProperty(t, "__proto__", {
                  get: () => e,
                  set(t) {
                    e.__proto__ = t;
                  },
                });
              })(this));
        }
      }
      function I(t = []) {
        const e = [];
        return (
          t.forEach((t) => {
            Array.isArray(t) ? e.push(...I(t)) : e.push(t);
          }),
          e
        );
      }
      function L(t, e) {
        return Array.prototype.filter.call(t, e);
      }
      function $(t, e) {
        const s = E(),
          i = T();
        let n = [];
        if (!e && t instanceof _) return t;
        if (!t) return new _(n);
        if ("string" == typeof t) {
          const s = t.trim();
          if (s.indexOf("<") >= 0 && s.indexOf(">") >= 0) {
            let t = "div";
            0 === s.indexOf("<li") && (t = "ul"),
              0 === s.indexOf("<tr") && (t = "tbody"),
              (0 !== s.indexOf("<td") && 0 !== s.indexOf("<th")) || (t = "tr"),
              0 === s.indexOf("<tbody") && (t = "table"),
              0 === s.indexOf("<option") && (t = "select");
            const e = i.createElement(t);
            e.innerHTML = s;
            for (let t = 0; t < e.childNodes.length; t += 1)
              n.push(e.childNodes[t]);
          } else
            n = (function (t, e) {
              if ("string" != typeof t) return [t];
              const s = [],
                i = e.querySelectorAll(t);
              for (let t = 0; t < i.length; t += 1) s.push(i[t]);
              return s;
            })(t.trim(), e || i);
        } else if (t.nodeType || t === s || t === i) n.push(t);
        else if (Array.isArray(t)) {
          if (t instanceof _) return t;
          n = t;
        }
        return new _(
          (function (t) {
            const e = [];
            for (let s = 0; s < t.length; s += 1)
              -1 === e.indexOf(t[s]) && e.push(t[s]);
            return e;
          })(n)
        );
      }
      $.fn = _.prototype;
      const k = "resize scroll".split(" ");
      function A(t) {
        return function (...e) {
          if (void 0 === e[0]) {
            for (let e = 0; e < this.length; e += 1)
              k.indexOf(t) < 0 &&
                (t in this[e] ? this[e][t]() : $(this[e]).trigger(t));
            return this;
          }
          return this.on(t, ...e);
        };
      }
      A("click"),
        A("blur"),
        A("focus"),
        A("focusin"),
        A("focusout"),
        A("keyup"),
        A("keydown"),
        A("keypress"),
        A("submit"),
        A("change"),
        A("mousedown"),
        A("mousemove"),
        A("mouseup"),
        A("mouseenter"),
        A("mouseleave"),
        A("mouseout"),
        A("mouseover"),
        A("touchstart"),
        A("touchend"),
        A("touchmove"),
        A("resize"),
        A("scroll");
      const O = {
        addClass: function (...t) {
          const e = I(t.map((t) => t.split(" ")));
          return (
            this.forEach((t) => {
              t.classList.add(...e);
            }),
            this
          );
        },
        removeClass: function (...t) {
          const e = I(t.map((t) => t.split(" ")));
          return (
            this.forEach((t) => {
              t.classList.remove(...e);
            }),
            this
          );
        },
        hasClass: function (...t) {
          const e = I(t.map((t) => t.split(" ")));
          return (
            L(this, (t) => e.filter((e) => t.classList.contains(e)).length > 0)
              .length > 0
          );
        },
        toggleClass: function (...t) {
          const e = I(t.map((t) => t.split(" ")));
          this.forEach((t) => {
            e.forEach((e) => {
              t.classList.toggle(e);
            });
          });
        },
        attr: function (t, e) {
          if (1 === arguments.length && "string" == typeof t)
            return this[0] ? this[0].getAttribute(t) : void 0;
          for (let s = 0; s < this.length; s += 1)
            if (2 === arguments.length) this[s].setAttribute(t, e);
            else
              for (const e in t)
                (this[s][e] = t[e]), this[s].setAttribute(e, t[e]);
          return this;
        },
        removeAttr: function (t) {
          for (let e = 0; e < this.length; e += 1) this[e].removeAttribute(t);
          return this;
        },
        transform: function (t) {
          for (let e = 0; e < this.length; e += 1) this[e].style.transform = t;
          return this;
        },
        transition: function (t) {
          for (let e = 0; e < this.length; e += 1)
            this[e].style.transitionDuration =
              "string" != typeof t ? `${t}ms` : t;
          return this;
        },
        on: function (...t) {
          let [e, s, i, n] = t;
          function a(t) {
            const e = t.target;
            if (!e) return;
            const n = t.target.dom7EventData || [];
            if ((n.indexOf(t) < 0 && n.unshift(t), $(e).is(s))) i.apply(e, n);
            else {
              const t = $(e).parents();
              for (let e = 0; e < t.length; e += 1)
                $(t[e]).is(s) && i.apply(t[e], n);
            }
          }
          function l(t) {
            const e = (t && t.target && t.target.dom7EventData) || [];
            e.indexOf(t) < 0 && e.unshift(t), i.apply(this, e);
          }
          "function" == typeof t[1] && (([e, i, n] = t), (s = void 0)),
            n || (n = !1);
          const r = e.split(" ");
          let o;
          for (let t = 0; t < this.length; t += 1) {
            const e = this[t];
            if (s)
              for (o = 0; o < r.length; o += 1) {
                const t = r[o];
                e.dom7LiveListeners || (e.dom7LiveListeners = {}),
                  e.dom7LiveListeners[t] || (e.dom7LiveListeners[t] = []),
                  e.dom7LiveListeners[t].push({
                    listener: i,
                    proxyListener: a,
                  }),
                  e.addEventListener(t, a, n);
              }
            else
              for (o = 0; o < r.length; o += 1) {
                const t = r[o];
                e.dom7Listeners || (e.dom7Listeners = {}),
                  e.dom7Listeners[t] || (e.dom7Listeners[t] = []),
                  e.dom7Listeners[t].push({ listener: i, proxyListener: l }),
                  e.addEventListener(t, l, n);
              }
          }
          return this;
        },
        off: function (...t) {
          let [e, s, i, n] = t;
          "function" == typeof t[1] && (([e, i, n] = t), (s = void 0)),
            n || (n = !1);
          const a = e.split(" ");
          for (let t = 0; t < a.length; t += 1) {
            const e = a[t];
            for (let t = 0; t < this.length; t += 1) {
              const a = this[t];
              let l;
              if (
                (!s && a.dom7Listeners
                  ? (l = a.dom7Listeners[e])
                  : s && a.dom7LiveListeners && (l = a.dom7LiveListeners[e]),
                l && l.length)
              )
                for (let t = l.length - 1; t >= 0; t -= 1) {
                  const s = l[t];
                  (i && s.listener === i) ||
                  (i &&
                    s.listener &&
                    s.listener.dom7proxy &&
                    s.listener.dom7proxy === i)
                    ? (a.removeEventListener(e, s.proxyListener, n),
                      l.splice(t, 1))
                    : i ||
                      (a.removeEventListener(e, s.proxyListener, n),
                      l.splice(t, 1));
                }
            }
          }
          return this;
        },
        trigger: function (...t) {
          const e = E(),
            s = t[0].split(" "),
            i = t[1];
          for (let n = 0; n < s.length; n += 1) {
            const a = s[n];
            for (let s = 0; s < this.length; s += 1) {
              const n = this[s];
              if (e.CustomEvent) {
                const s = new e.CustomEvent(a, {
                  detail: i,
                  bubbles: !0,
                  cancelable: !0,
                });
                (n.dom7EventData = t.filter((t, e) => e > 0)),
                  n.dispatchEvent(s),
                  (n.dom7EventData = []),
                  delete n.dom7EventData;
              }
            }
          }
          return this;
        },
        transitionEnd: function (t) {
          const e = this;
          return (
            t &&
              e.on("transitionend", function s(i) {
                i.target === this &&
                  (t.call(this, i), e.off("transitionend", s));
              }),
            this
          );
        },
        outerWidth: function (t) {
          if (this.length > 0) {
            if (t) {
              const t = this.styles();
              return (
                this[0].offsetWidth +
                parseFloat(t.getPropertyValue("margin-right")) +
                parseFloat(t.getPropertyValue("margin-left"))
              );
            }
            return this[0].offsetWidth;
          }
          return null;
        },
        outerHeight: function (t) {
          if (this.length > 0) {
            if (t) {
              const t = this.styles();
              return (
                this[0].offsetHeight +
                parseFloat(t.getPropertyValue("margin-top")) +
                parseFloat(t.getPropertyValue("margin-bottom"))
              );
            }
            return this[0].offsetHeight;
          }
          return null;
        },
        styles: function () {
          const t = E();
          return this[0] ? t.getComputedStyle(this[0], null) : {};
        },
        offset: function () {
          if (this.length > 0) {
            const t = E(),
              e = T(),
              s = this[0],
              i = s.getBoundingClientRect(),
              n = e.body,
              a = s.clientTop || n.clientTop || 0,
              l = s.clientLeft || n.clientLeft || 0,
              r = s === t ? t.scrollY : s.scrollTop,
              o = s === t ? t.scrollX : s.scrollLeft;
            return { top: i.top + r - a, left: i.left + o - l };
          }
          return null;
        },
        css: function (t, e) {
          const s = E();
          let i;
          if (1 === arguments.length) {
            if ("string" != typeof t) {
              for (i = 0; i < this.length; i += 1)
                for (const e in t) this[i].style[e] = t[e];
              return this;
            }
            if (this[0])
              return s.getComputedStyle(this[0], null).getPropertyValue(t);
          }
          if (2 === arguments.length && "string" == typeof t) {
            for (i = 0; i < this.length; i += 1) this[i].style[t] = e;
            return this;
          }
          return this;
        },
        each: function (t) {
          return t
            ? (this.forEach((e, s) => {
                t.apply(e, [e, s]);
              }),
              this)
            : this;
        },
        html: function (t) {
          if (void 0 === t) return this[0] ? this[0].innerHTML : null;
          for (let e = 0; e < this.length; e += 1) this[e].innerHTML = t;
          return this;
        },
        text: function (t) {
          if (void 0 === t) return this[0] ? this[0].textContent.trim() : null;
          for (let e = 0; e < this.length; e += 1) this[e].textContent = t;
          return this;
        },
        is: function (t) {
          const e = E(),
            s = T(),
            i = this[0];
          let n, a;
          if (!i || void 0 === t) return !1;
          if ("string" == typeof t) {
            if (i.matches) return i.matches(t);
            if (i.webkitMatchesSelector) return i.webkitMatchesSelector(t);
            if (i.msMatchesSelector) return i.msMatchesSelector(t);
            for (n = $(t), a = 0; a < n.length; a += 1)
              if (n[a] === i) return !0;
            return !1;
          }
          if (t === s) return i === s;
          if (t === e) return i === e;
          if (t.nodeType || t instanceof _) {
            for (n = t.nodeType ? [t] : t, a = 0; a < n.length; a += 1)
              if (n[a] === i) return !0;
            return !1;
          }
          return !1;
        },
        index: function () {
          let t,
            e = this[0];
          if (e) {
            for (t = 0; null !== (e = e.previousSibling); )
              1 === e.nodeType && (t += 1);
            return t;
          }
        },
        eq: function (t) {
          if (void 0 === t) return this;
          const e = this.length;
          if (t > e - 1) return $([]);
          if (t < 0) {
            const s = e + t;
            return $(s < 0 ? [] : [this[s]]);
          }
          return $([this[t]]);
        },
        append: function (...t) {
          let e;
          const s = T();
          for (let i = 0; i < t.length; i += 1) {
            e = t[i];
            for (let t = 0; t < this.length; t += 1)
              if ("string" == typeof e) {
                const i = s.createElement("div");
                for (i.innerHTML = e; i.firstChild; )
                  this[t].appendChild(i.firstChild);
              } else if (e instanceof _)
                for (let s = 0; s < e.length; s += 1) this[t].appendChild(e[s]);
              else this[t].appendChild(e);
          }
          return this;
        },
        prepend: function (t) {
          const e = T();
          let s, i;
          for (s = 0; s < this.length; s += 1)
            if ("string" == typeof t) {
              const n = e.createElement("div");
              for (n.innerHTML = t, i = n.childNodes.length - 1; i >= 0; i -= 1)
                this[s].insertBefore(n.childNodes[i], this[s].childNodes[0]);
            } else if (t instanceof _)
              for (i = 0; i < t.length; i += 1)
                this[s].insertBefore(t[i], this[s].childNodes[0]);
            else this[s].insertBefore(t, this[s].childNodes[0]);
          return this;
        },
        next: function (t) {
          return this.length > 0
            ? t
              ? this[0].nextElementSibling &&
                $(this[0].nextElementSibling).is(t)
                ? $([this[0].nextElementSibling])
                : $([])
              : this[0].nextElementSibling
              ? $([this[0].nextElementSibling])
              : $([])
            : $([]);
        },
        nextAll: function (t) {
          const e = [];
          let s = this[0];
          if (!s) return $([]);
          for (; s.nextElementSibling; ) {
            const i = s.nextElementSibling;
            t ? $(i).is(t) && e.push(i) : e.push(i), (s = i);
          }
          return $(e);
        },
        prev: function (t) {
          if (this.length > 0) {
            const e = this[0];
            return t
              ? e.previousElementSibling && $(e.previousElementSibling).is(t)
                ? $([e.previousElementSibling])
                : $([])
              : e.previousElementSibling
              ? $([e.previousElementSibling])
              : $([]);
          }
          return $([]);
        },
        prevAll: function (t) {
          const e = [];
          let s = this[0];
          if (!s) return $([]);
          for (; s.previousElementSibling; ) {
            const i = s.previousElementSibling;
            t ? $(i).is(t) && e.push(i) : e.push(i), (s = i);
          }
          return $(e);
        },
        parent: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1)
            null !== this[s].parentNode &&
              (t
                ? $(this[s].parentNode).is(t) && e.push(this[s].parentNode)
                : e.push(this[s].parentNode));
          return $(e);
        },
        parents: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1) {
            let i = this[s].parentNode;
            for (; i; )
              t ? $(i).is(t) && e.push(i) : e.push(i), (i = i.parentNode);
          }
          return $(e);
        },
        closest: function (t) {
          let e = this;
          return void 0 === t
            ? $([])
            : (e.is(t) || (e = e.parents(t).eq(0)), e);
        },
        find: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].querySelectorAll(t);
            for (let t = 0; t < i.length; t += 1) e.push(i[t]);
          }
          return $(e);
        },
        children: function (t) {
          const e = [];
          for (let s = 0; s < this.length; s += 1) {
            const i = this[s].children;
            for (let s = 0; s < i.length; s += 1)
              (t && !$(i[s]).is(t)) || e.push(i[s]);
          }
          return $(e);
        },
        filter: function (t) {
          return $(L(this, t));
        },
        remove: function () {
          for (let t = 0; t < this.length; t += 1)
            this[t].parentNode && this[t].parentNode.removeChild(this[t]);
          return this;
        },
      };
      Object.keys(O).forEach((t) => {
        Object.defineProperty($.fn, t, { value: O[t], writable: !0 });
      });
      const M = $;
      function P(t, e) {
        return void 0 === e && (e = 0), setTimeout(t, e);
      }
      function D() {
        return Date.now();
      }
      function z(t, e) {
        void 0 === e && (e = "x");
        const s = E();
        let i, n, a;
        const l = (function (t) {
          const e = E();
          let s;
          return (
            e.getComputedStyle && (s = e.getComputedStyle(t, null)),
            !s && t.currentStyle && (s = t.currentStyle),
            s || (s = t.style),
            s
          );
        })(t);
        return (
          s.WebKitCSSMatrix
            ? ((n = l.transform || l.webkitTransform),
              n.split(",").length > 6 &&
                (n = n
                  .split(", ")
                  .map((t) => t.replace(",", "."))
                  .join(", ")),
              (a = new s.WebKitCSSMatrix("none" === n ? "" : n)))
            : ((a =
                l.MozTransform ||
                l.OTransform ||
                l.MsTransform ||
                l.msTransform ||
                l.transform ||
                l
                  .getPropertyValue("transform")
                  .replace("translate(", "matrix(1, 0, 0, 1,")),
              (i = a.toString().split(","))),
          "x" === e &&
            (n = s.WebKitCSSMatrix
              ? a.m41
              : 16 === i.length
              ? parseFloat(i[12])
              : parseFloat(i[4])),
          "y" === e &&
            (n = s.WebKitCSSMatrix
              ? a.m42
              : 16 === i.length
              ? parseFloat(i[13])
              : parseFloat(i[5])),
          n || 0
        );
      }
      function B(t) {
        return (
          "object" == typeof t &&
          null !== t &&
          t.constructor &&
          "Object" === Object.prototype.toString.call(t).slice(8, -1)
        );
      }
      function G(t) {
        return "undefined" != typeof window && void 0 !== window.HTMLElement
          ? t instanceof HTMLElement
          : t && (1 === t.nodeType || 11 === t.nodeType);
      }
      function q() {
        const t = Object(arguments.length <= 0 ? void 0 : arguments[0]),
          e = ["__proto__", "constructor", "prototype"];
        for (let s = 1; s < arguments.length; s += 1) {
          const i = s < 0 || arguments.length <= s ? void 0 : arguments[s];
          if (null != i && !G(i)) {
            const s = Object.keys(Object(i)).filter((t) => e.indexOf(t) < 0);
            for (let e = 0, n = s.length; e < n; e += 1) {
              const n = s[e],
                a = Object.getOwnPropertyDescriptor(i, n);
              void 0 !== a &&
                a.enumerable &&
                (B(t[n]) && B(i[n])
                  ? i[n].__swiper__
                    ? (t[n] = i[n])
                    : q(t[n], i[n])
                  : !B(t[n]) && B(i[n])
                  ? ((t[n] = {}),
                    i[n].__swiper__ ? (t[n] = i[n]) : q(t[n], i[n]))
                  : (t[n] = i[n]));
            }
          }
        }
        return t;
      }
      function H(t, e, s) {
        t.style.setProperty(e, s);
      }
      function N(t) {
        let { swiper: e, targetPosition: s, side: i } = t;
        const n = E(),
          a = -e.translate;
        let l,
          r = null;
        const o = e.params.speed;
        (e.wrapperEl.style.scrollSnapType = "none"),
          n.cancelAnimationFrame(e.cssModeFrameID);
        const d = s > a ? "next" : "prev",
          c = (t, e) => ("next" === d && t >= e) || ("prev" === d && t <= e),
          u = () => {
            (l = new Date().getTime()), null === r && (r = l);
            const t = Math.max(Math.min((l - r) / o, 1), 0),
              d = 0.5 - Math.cos(t * Math.PI) / 2;
            let h = a + d * (s - a);
            if ((c(h, s) && (h = s), e.wrapperEl.scrollTo({ [i]: h }), c(h, s)))
              return (
                (e.wrapperEl.style.overflow = "hidden"),
                (e.wrapperEl.style.scrollSnapType = ""),
                setTimeout(() => {
                  (e.wrapperEl.style.overflow = ""),
                    e.wrapperEl.scrollTo({ [i]: h });
                }),
                void n.cancelAnimationFrame(e.cssModeFrameID)
              );
            e.cssModeFrameID = n.requestAnimationFrame(u);
          };
        u();
      }
      let j, F, W;
      function V() {
        return (
          j ||
            (j = (function () {
              const t = E(),
                e = T();
              return {
                smoothScroll:
                  e.documentElement &&
                  "scrollBehavior" in e.documentElement.style,
                touch: !!(
                  "ontouchstart" in t ||
                  (t.DocumentTouch && e instanceof t.DocumentTouch)
                ),
                passiveListener: (function () {
                  let e = !1;
                  try {
                    const s = Object.defineProperty({}, "passive", {
                      get() {
                        e = !0;
                      },
                    });
                    t.addEventListener("testPassiveListener", null, s);
                  } catch (t) {}
                  return e;
                })(),
                gestures: "ongesturestart" in t,
              };
            })()),
          j
        );
      }
      function X(t) {
        return (
          void 0 === t && (t = {}),
          F ||
            (F = (function (t) {
              let { userAgent: e } = void 0 === t ? {} : t;
              const s = V(),
                i = E(),
                n = i.navigator.platform,
                a = e || i.navigator.userAgent,
                l = { ios: !1, android: !1 },
                r = i.screen.width,
                o = i.screen.height,
                d = a.match(/(Android);?[\s\/]+([\d.]+)?/);
              let c = a.match(/(iPad).*OS\s([\d_]+)/);
              const u = a.match(/(iPod)(.*OS\s([\d_]+))?/),
                h = !c && a.match(/(iPhone\sOS|iOS)\s([\d_]+)/),
                p = "Win32" === n;
              let m = "MacIntel" === n;
              return (
                !c &&
                  m &&
                  s.touch &&
                  [
                    "1024x1366",
                    "1366x1024",
                    "834x1194",
                    "1194x834",
                    "834x1112",
                    "1112x834",
                    "768x1024",
                    "1024x768",
                    "820x1180",
                    "1180x820",
                    "810x1080",
                    "1080x810",
                  ].indexOf(`${r}x${o}`) >= 0 &&
                  ((c = a.match(/(Version)\/([\d.]+)/)),
                  c || (c = [0, 1, "13_0_0"]),
                  (m = !1)),
                d && !p && ((l.os = "android"), (l.android = !0)),
                (c || h || u) && ((l.os = "ios"), (l.ios = !0)),
                l
              );
            })(t)),
          F
        );
      }
      function R() {
        return (
          W ||
            (W = (function () {
              const t = E();
              return {
                isSafari: (function () {
                  const e = t.navigator.userAgent.toLowerCase();
                  return (
                    e.indexOf("safari") >= 0 &&
                    e.indexOf("chrome") < 0 &&
                    e.indexOf("android") < 0
                  );
                })(),
                isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(
                  t.navigator.userAgent
                ),
              };
            })()),
          W
        );
      }
      const Y = {
        on(t, e, s) {
          const i = this;
          if ("function" != typeof e) return i;
          const n = s ? "unshift" : "push";
          return (
            t.split(" ").forEach((t) => {
              i.eventsListeners[t] || (i.eventsListeners[t] = []),
                i.eventsListeners[t][n](e);
            }),
            i
          );
        },
        once(t, e, s) {
          const i = this;
          if ("function" != typeof e) return i;
          function n() {
            i.off(t, n), n.__emitterProxy && delete n.__emitterProxy;
            for (var s = arguments.length, a = new Array(s), l = 0; l < s; l++)
              a[l] = arguments[l];
            e.apply(i, a);
          }
          return (n.__emitterProxy = e), i.on(t, n, s);
        },
        onAny(t, e) {
          const s = this;
          if ("function" != typeof t) return s;
          const i = e ? "unshift" : "push";
          return (
            s.eventsAnyListeners.indexOf(t) < 0 && s.eventsAnyListeners[i](t), s
          );
        },
        offAny(t) {
          const e = this;
          if (!e.eventsAnyListeners) return e;
          const s = e.eventsAnyListeners.indexOf(t);
          return s >= 0 && e.eventsAnyListeners.splice(s, 1), e;
        },
        off(t, e) {
          const s = this;
          return s.eventsListeners
            ? (t.split(" ").forEach((t) => {
                void 0 === e
                  ? (s.eventsListeners[t] = [])
                  : s.eventsListeners[t] &&
                    s.eventsListeners[t].forEach((i, n) => {
                      (i === e ||
                        (i.__emitterProxy && i.__emitterProxy === e)) &&
                        s.eventsListeners[t].splice(n, 1);
                    });
              }),
              s)
            : s;
        },
        emit() {
          const t = this;
          if (!t.eventsListeners) return t;
          let e, s, i;
          for (var n = arguments.length, a = new Array(n), l = 0; l < n; l++)
            a[l] = arguments[l];
          "string" == typeof a[0] || Array.isArray(a[0])
            ? ((e = a[0]), (s = a.slice(1, a.length)), (i = t))
            : ((e = a[0].events), (s = a[0].data), (i = a[0].context || t)),
            s.unshift(i);
          return (
            (Array.isArray(e) ? e : e.split(" ")).forEach((e) => {
              t.eventsAnyListeners &&
                t.eventsAnyListeners.length &&
                t.eventsAnyListeners.forEach((t) => {
                  t.apply(i, [e, ...s]);
                }),
                t.eventsListeners &&
                  t.eventsListeners[e] &&
                  t.eventsListeners[e].forEach((t) => {
                    t.apply(i, s);
                  });
            }),
            t
          );
        },
      };
      const U = {
        updateSize: function () {
          const t = this;
          let e, s;
          const i = t.$el;
          (e =
            void 0 !== t.params.width && null !== t.params.width
              ? t.params.width
              : i[0].clientWidth),
            (s =
              void 0 !== t.params.height && null !== t.params.height
                ? t.params.height
                : i[0].clientHeight),
            (0 === e && t.isHorizontal()) ||
              (0 === s && t.isVertical()) ||
              ((e =
                e -
                parseInt(i.css("padding-left") || 0, 10) -
                parseInt(i.css("padding-right") || 0, 10)),
              (s =
                s -
                parseInt(i.css("padding-top") || 0, 10) -
                parseInt(i.css("padding-bottom") || 0, 10)),
              Number.isNaN(e) && (e = 0),
              Number.isNaN(s) && (s = 0),
              Object.assign(t, {
                width: e,
                height: s,
                size: t.isHorizontal() ? e : s,
              }));
        },
        updateSlides: function () {
          const t = this;
          function e(e) {
            return t.isHorizontal()
              ? e
              : {
                  width: "height",
                  "margin-top": "margin-left",
                  "margin-bottom ": "margin-right",
                  "margin-left": "margin-top",
                  "margin-right": "margin-bottom",
                  "padding-left": "padding-top",
                  "padding-right": "padding-bottom",
                  marginRight: "marginBottom",
                }[e];
          }
          function s(t, s) {
            return parseFloat(t.getPropertyValue(e(s)) || 0);
          }
          const i = t.params,
            { $wrapperEl: n, size: a, rtlTranslate: l, wrongRTL: r } = t,
            o = t.virtual && i.virtual.enabled,
            d = o ? t.virtual.slides.length : t.slides.length,
            c = n.children(`.${t.params.slideClass}`),
            u = o ? t.virtual.slides.length : c.length;
          let h = [];
          const p = [],
            m = [];
          let g = i.slidesOffsetBefore;
          "function" == typeof g && (g = i.slidesOffsetBefore.call(t));
          let f = i.slidesOffsetAfter;
          "function" == typeof f && (f = i.slidesOffsetAfter.call(t));
          const v = t.snapGrid.length,
            b = t.slidesGrid.length;
          let y = i.spaceBetween,
            w = -g,
            S = 0,
            C = 0;
          if (void 0 === a) return;
          "string" == typeof y &&
            y.indexOf("%") >= 0 &&
            (y = (parseFloat(y.replace("%", "")) / 100) * a),
            (t.virtualSize = -y),
            l
              ? c.css({ marginLeft: "", marginBottom: "", marginTop: "" })
              : c.css({ marginRight: "", marginBottom: "", marginTop: "" }),
            i.centeredSlides &&
              i.cssMode &&
              (H(t.wrapperEl, "--swiper-centered-offset-before", ""),
              H(t.wrapperEl, "--swiper-centered-offset-after", ""));
          const T = i.grid && i.grid.rows > 1 && t.grid;
          let x;
          T && t.grid.initSlides(u);
          const E =
            "auto" === i.slidesPerView &&
            i.breakpoints &&
            Object.keys(i.breakpoints).filter(
              (t) => void 0 !== i.breakpoints[t].slidesPerView
            ).length > 0;
          for (let n = 0; n < u; n += 1) {
            x = 0;
            const l = c.eq(n);
            if (
              (T && t.grid.updateSlide(n, l, u, e), "none" !== l.css("display"))
            ) {
              if ("auto" === i.slidesPerView) {
                E && (c[n].style[e("width")] = "");
                const a = getComputedStyle(l[0]),
                  r = l[0].style.transform,
                  o = l[0].style.webkitTransform;
                if (
                  (r && (l[0].style.transform = "none"),
                  o && (l[0].style.webkitTransform = "none"),
                  i.roundLengths)
                )
                  x = t.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0);
                else {
                  const t = s(a, "width"),
                    e = s(a, "padding-left"),
                    i = s(a, "padding-right"),
                    n = s(a, "margin-left"),
                    r = s(a, "margin-right"),
                    o = a.getPropertyValue("box-sizing");
                  if (o && "border-box" === o) x = t + n + r;
                  else {
                    const { clientWidth: s, offsetWidth: a } = l[0];
                    x = t + e + i + n + r + (a - s);
                  }
                }
                r && (l[0].style.transform = r),
                  o && (l[0].style.webkitTransform = o),
                  i.roundLengths && (x = Math.floor(x));
              } else
                (x = (a - (i.slidesPerView - 1) * y) / i.slidesPerView),
                  i.roundLengths && (x = Math.floor(x)),
                  c[n] && (c[n].style[e("width")] = `${x}px`);
              c[n] && (c[n].swiperSlideSize = x),
                m.push(x),
                i.centeredSlides
                  ? ((w = w + x / 2 + S / 2 + y),
                    0 === S && 0 !== n && (w = w - a / 2 - y),
                    0 === n && (w = w - a / 2 - y),
                    Math.abs(w) < 0.001 && (w = 0),
                    i.roundLengths && (w = Math.floor(w)),
                    C % i.slidesPerGroup == 0 && h.push(w),
                    p.push(w))
                  : (i.roundLengths && (w = Math.floor(w)),
                    (C - Math.min(t.params.slidesPerGroupSkip, C)) %
                      t.params.slidesPerGroup ==
                      0 && h.push(w),
                    p.push(w),
                    (w = w + x + y)),
                (t.virtualSize += x + y),
                (S = x),
                (C += 1);
            }
          }
          if (
            ((t.virtualSize = Math.max(t.virtualSize, a) + f),
            l &&
              r &&
              ("slide" === i.effect || "coverflow" === i.effect) &&
              n.css({ width: `${t.virtualSize + i.spaceBetween}px` }),
            i.setWrapperSize &&
              n.css({ [e("width")]: `${t.virtualSize + i.spaceBetween}px` }),
            T && t.grid.updateWrapperSize(x, h, e),
            !i.centeredSlides)
          ) {
            const e = [];
            for (let s = 0; s < h.length; s += 1) {
              let n = h[s];
              i.roundLengths && (n = Math.floor(n)),
                h[s] <= t.virtualSize - a && e.push(n);
            }
            (h = e),
              Math.floor(t.virtualSize - a) - Math.floor(h[h.length - 1]) > 1 &&
                h.push(t.virtualSize - a);
          }
          if ((0 === h.length && (h = [0]), 0 !== i.spaceBetween)) {
            const s = t.isHorizontal() && l ? "marginLeft" : e("marginRight");
            c.filter((t, e) => !i.cssMode || e !== c.length - 1).css({
              [s]: `${y}px`,
            });
          }
          if (i.centeredSlides && i.centeredSlidesBounds) {
            let t = 0;
            m.forEach((e) => {
              t += e + (i.spaceBetween ? i.spaceBetween : 0);
            }),
              (t -= i.spaceBetween);
            const e = t - a;
            h = h.map((t) => (t < 0 ? -g : t > e ? e + f : t));
          }
          if (i.centerInsufficientSlides) {
            let t = 0;
            if (
              (m.forEach((e) => {
                t += e + (i.spaceBetween ? i.spaceBetween : 0);
              }),
              (t -= i.spaceBetween),
              t < a)
            ) {
              const e = (a - t) / 2;
              h.forEach((t, s) => {
                h[s] = t - e;
              }),
                p.forEach((t, s) => {
                  p[s] = t + e;
                });
            }
          }
          if (
            (Object.assign(t, {
              slides: c,
              snapGrid: h,
              slidesGrid: p,
              slidesSizesGrid: m,
            }),
            i.centeredSlides && i.cssMode && !i.centeredSlidesBounds)
          ) {
            H(t.wrapperEl, "--swiper-centered-offset-before", -h[0] + "px"),
              H(
                t.wrapperEl,
                "--swiper-centered-offset-after",
                t.size / 2 - m[m.length - 1] / 2 + "px"
              );
            const e = -t.snapGrid[0],
              s = -t.slidesGrid[0];
            (t.snapGrid = t.snapGrid.map((t) => t + e)),
              (t.slidesGrid = t.slidesGrid.map((t) => t + s));
          }
          if (
            (u !== d && t.emit("slidesLengthChange"),
            h.length !== v &&
              (t.params.watchOverflow && t.checkOverflow(),
              t.emit("snapGridLengthChange")),
            p.length !== b && t.emit("slidesGridLengthChange"),
            i.watchSlidesProgress && t.updateSlidesOffset(),
            !(o || i.cssMode || ("slide" !== i.effect && "fade" !== i.effect)))
          ) {
            const e = `${i.containerModifierClass}backface-hidden`,
              s = t.$el.hasClass(e);
            u <= i.maxBackfaceHiddenSlides
              ? s || t.$el.addClass(e)
              : s && t.$el.removeClass(e);
          }
        },
        updateAutoHeight: function (t) {
          const e = this,
            s = [],
            i = e.virtual && e.params.virtual.enabled;
          let n,
            a = 0;
          "number" == typeof t
            ? e.setTransition(t)
            : !0 === t && e.setTransition(e.params.speed);
          const l = (t) =>
            i
              ? e.slides.filter(
                  (e) =>
                    parseInt(e.getAttribute("data-swiper-slide-index"), 10) ===
                    t
                )[0]
              : e.slides.eq(t)[0];
          if ("auto" !== e.params.slidesPerView && e.params.slidesPerView > 1)
            if (e.params.centeredSlides)
              e.visibleSlides.each((t) => {
                s.push(t);
              });
            else
              for (n = 0; n < Math.ceil(e.params.slidesPerView); n += 1) {
                const t = e.activeIndex + n;
                if (t > e.slides.length && !i) break;
                s.push(l(t));
              }
          else s.push(l(e.activeIndex));
          for (n = 0; n < s.length; n += 1)
            if (void 0 !== s[n]) {
              const t = s[n].offsetHeight;
              a = t > a ? t : a;
            }
          (a || 0 === a) && e.$wrapperEl.css("height", `${a}px`);
        },
        updateSlidesOffset: function () {
          const t = this,
            e = t.slides;
          for (let s = 0; s < e.length; s += 1)
            e[s].swiperSlideOffset = t.isHorizontal()
              ? e[s].offsetLeft
              : e[s].offsetTop;
        },
        updateSlidesProgress: function (t) {
          void 0 === t && (t = (this && this.translate) || 0);
          const e = this,
            s = e.params,
            { slides: i, rtlTranslate: n, snapGrid: a } = e;
          if (0 === i.length) return;
          void 0 === i[0].swiperSlideOffset && e.updateSlidesOffset();
          let l = -t;
          n && (l = t),
            i.removeClass(s.slideVisibleClass),
            (e.visibleSlidesIndexes = []),
            (e.visibleSlides = []);
          for (let t = 0; t < i.length; t += 1) {
            const r = i[t];
            let o = r.swiperSlideOffset;
            s.cssMode && s.centeredSlides && (o -= i[0].swiperSlideOffset);
            const d =
                (l + (s.centeredSlides ? e.minTranslate() : 0) - o) /
                (r.swiperSlideSize + s.spaceBetween),
              c =
                (l - a[0] + (s.centeredSlides ? e.minTranslate() : 0) - o) /
                (r.swiperSlideSize + s.spaceBetween),
              u = -(l - o),
              h = u + e.slidesSizesGrid[t];
            ((u >= 0 && u < e.size - 1) ||
              (h > 1 && h <= e.size) ||
              (u <= 0 && h >= e.size)) &&
              (e.visibleSlides.push(r),
              e.visibleSlidesIndexes.push(t),
              i.eq(t).addClass(s.slideVisibleClass)),
              (r.progress = n ? -d : d),
              (r.originalProgress = n ? -c : c);
          }
          e.visibleSlides = M(e.visibleSlides);
        },
        updateProgress: function (t) {
          const e = this;
          if (void 0 === t) {
            const s = e.rtlTranslate ? -1 : 1;
            t = (e && e.translate && e.translate * s) || 0;
          }
          const s = e.params,
            i = e.maxTranslate() - e.minTranslate();
          let { progress: n, isBeginning: a, isEnd: l } = e;
          const r = a,
            o = l;
          0 === i
            ? ((n = 0), (a = !0), (l = !0))
            : ((n = (t - e.minTranslate()) / i), (a = n <= 0), (l = n >= 1)),
            Object.assign(e, { progress: n, isBeginning: a, isEnd: l }),
            (s.watchSlidesProgress || (s.centeredSlides && s.autoHeight)) &&
              e.updateSlidesProgress(t),
            a && !r && e.emit("reachBeginning toEdge"),
            l && !o && e.emit("reachEnd toEdge"),
            ((r && !a) || (o && !l)) && e.emit("fromEdge"),
            e.emit("progress", n);
        },
        updateSlidesClasses: function () {
          const t = this,
            {
              slides: e,
              params: s,
              $wrapperEl: i,
              activeIndex: n,
              realIndex: a,
            } = t,
            l = t.virtual && s.virtual.enabled;
          let r;
          e.removeClass(
            `${s.slideActiveClass} ${s.slideNextClass} ${s.slidePrevClass} ${s.slideDuplicateActiveClass} ${s.slideDuplicateNextClass} ${s.slideDuplicatePrevClass}`
          ),
            (r = l
              ? t.$wrapperEl.find(
                  `.${s.slideClass}[data-swiper-slide-index="${n}"]`
                )
              : e.eq(n)),
            r.addClass(s.slideActiveClass),
            s.loop &&
              (r.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${s.slideDuplicateClass})[data-swiper-slide-index="${a}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass)
                : i
                    .children(
                      `.${s.slideClass}.${s.slideDuplicateClass}[data-swiper-slide-index="${a}"]`
                    )
                    .addClass(s.slideDuplicateActiveClass));
          let o = r
            .nextAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slideNextClass);
          s.loop &&
            0 === o.length &&
            ((o = e.eq(0)), o.addClass(s.slideNextClass));
          let d = r
            .prevAll(`.${s.slideClass}`)
            .eq(0)
            .addClass(s.slidePrevClass);
          s.loop &&
            0 === d.length &&
            ((d = e.eq(-1)), d.addClass(s.slidePrevClass)),
            s.loop &&
              (o.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${o.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass)
                : i
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${o.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicateNextClass),
              d.hasClass(s.slideDuplicateClass)
                ? i
                    .children(
                      `.${s.slideClass}:not(.${
                        s.slideDuplicateClass
                      })[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)
                : i
                    .children(
                      `.${s.slideClass}.${
                        s.slideDuplicateClass
                      }[data-swiper-slide-index="${d.attr(
                        "data-swiper-slide-index"
                      )}"]`
                    )
                    .addClass(s.slideDuplicatePrevClass)),
            t.emitSlidesClasses();
        },
        updateActiveIndex: function (t) {
          const e = this,
            s = e.rtlTranslate ? e.translate : -e.translate,
            {
              slidesGrid: i,
              snapGrid: n,
              params: a,
              activeIndex: l,
              realIndex: r,
              snapIndex: o,
            } = e;
          let d,
            c = t;
          if (void 0 === c) {
            for (let t = 0; t < i.length; t += 1)
              void 0 !== i[t + 1]
                ? s >= i[t] && s < i[t + 1] - (i[t + 1] - i[t]) / 2
                  ? (c = t)
                  : s >= i[t] && s < i[t + 1] && (c = t + 1)
                : s >= i[t] && (c = t);
            a.normalizeSlideIndex && (c < 0 || void 0 === c) && (c = 0);
          }
          if (n.indexOf(s) >= 0) d = n.indexOf(s);
          else {
            const t = Math.min(a.slidesPerGroupSkip, c);
            d = t + Math.floor((c - t) / a.slidesPerGroup);
          }
          if ((d >= n.length && (d = n.length - 1), c === l))
            return void (
              d !== o && ((e.snapIndex = d), e.emit("snapIndexChange"))
            );
          const u = parseInt(
            e.slides.eq(c).attr("data-swiper-slide-index") || c,
            10
          );
          Object.assign(e, {
            snapIndex: d,
            realIndex: u,
            previousIndex: l,
            activeIndex: c,
          }),
            e.emit("activeIndexChange"),
            e.emit("snapIndexChange"),
            r !== u && e.emit("realIndexChange"),
            (e.initialized || e.params.runCallbacksOnInit) &&
              e.emit("slideChange");
        },
        updateClickedSlide: function (t) {
          const e = this,
            s = e.params,
            i = M(t).closest(`.${s.slideClass}`)[0];
          let n,
            a = !1;
          if (i)
            for (let t = 0; t < e.slides.length; t += 1)
              if (e.slides[t] === i) {
                (a = !0), (n = t);
                break;
              }
          if (!i || !a)
            return (e.clickedSlide = void 0), void (e.clickedIndex = void 0);
          (e.clickedSlide = i),
            e.virtual && e.params.virtual.enabled
              ? (e.clickedIndex = parseInt(
                  M(i).attr("data-swiper-slide-index"),
                  10
                ))
              : (e.clickedIndex = n),
            s.slideToClickedSlide &&
              void 0 !== e.clickedIndex &&
              e.clickedIndex !== e.activeIndex &&
              e.slideToClickedSlide();
        },
      };
      const K = {
        getTranslate: function (t) {
          void 0 === t && (t = this.isHorizontal() ? "x" : "y");
          const {
            params: e,
            rtlTranslate: s,
            translate: i,
            $wrapperEl: n,
          } = this;
          if (e.virtualTranslate) return s ? -i : i;
          if (e.cssMode) return i;
          let a = z(n[0], t);
          return s && (a = -a), a || 0;
        },
        setTranslate: function (t, e) {
          const s = this,
            {
              rtlTranslate: i,
              params: n,
              $wrapperEl: a,
              wrapperEl: l,
              progress: r,
            } = s;
          let o,
            d = 0,
            c = 0;
          s.isHorizontal() ? (d = i ? -t : t) : (c = t),
            n.roundLengths && ((d = Math.floor(d)), (c = Math.floor(c))),
            n.cssMode
              ? (l[s.isHorizontal() ? "scrollLeft" : "scrollTop"] =
                  s.isHorizontal() ? -d : -c)
              : n.virtualTranslate ||
                a.transform(`translate3d(${d}px, ${c}px, 0px)`),
            (s.previousTranslate = s.translate),
            (s.translate = s.isHorizontal() ? d : c);
          const u = s.maxTranslate() - s.minTranslate();
          (o = 0 === u ? 0 : (t - s.minTranslate()) / u),
            o !== r && s.updateProgress(t),
            s.emit("setTranslate", s.translate, e);
        },
        minTranslate: function () {
          return -this.snapGrid[0];
        },
        maxTranslate: function () {
          return -this.snapGrid[this.snapGrid.length - 1];
        },
        translateTo: function (t, e, s, i, n) {
          void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === s && (s = !0),
            void 0 === i && (i = !0);
          const a = this,
            { params: l, wrapperEl: r } = a;
          if (a.animating && l.preventInteractionOnTransition) return !1;
          const o = a.minTranslate(),
            d = a.maxTranslate();
          let c;
          if (
            ((c = i && t > o ? o : i && t < d ? d : t),
            a.updateProgress(c),
            l.cssMode)
          ) {
            const t = a.isHorizontal();
            if (0 === e) r[t ? "scrollLeft" : "scrollTop"] = -c;
            else {
              if (!a.support.smoothScroll)
                return (
                  N({
                    swiper: a,
                    targetPosition: -c,
                    side: t ? "left" : "top",
                  }),
                  !0
                );
              r.scrollTo({ [t ? "left" : "top"]: -c, behavior: "smooth" });
            }
            return !0;
          }
          return (
            0 === e
              ? (a.setTransition(0),
                a.setTranslate(c),
                s &&
                  (a.emit("beforeTransitionStart", e, n),
                  a.emit("transitionEnd")))
              : (a.setTransition(e),
                a.setTranslate(c),
                s &&
                  (a.emit("beforeTransitionStart", e, n),
                  a.emit("transitionStart")),
                a.animating ||
                  ((a.animating = !0),
                  a.onTranslateToWrapperTransitionEnd ||
                    (a.onTranslateToWrapperTransitionEnd = function (t) {
                      a &&
                        !a.destroyed &&
                        t.target === this &&
                        (a.$wrapperEl[0].removeEventListener(
                          "transitionend",
                          a.onTranslateToWrapperTransitionEnd
                        ),
                        a.$wrapperEl[0].removeEventListener(
                          "webkitTransitionEnd",
                          a.onTranslateToWrapperTransitionEnd
                        ),
                        (a.onTranslateToWrapperTransitionEnd = null),
                        delete a.onTranslateToWrapperTransitionEnd,
                        s && a.emit("transitionEnd"));
                    }),
                  a.$wrapperEl[0].addEventListener(
                    "transitionend",
                    a.onTranslateToWrapperTransitionEnd
                  ),
                  a.$wrapperEl[0].addEventListener(
                    "webkitTransitionEnd",
                    a.onTranslateToWrapperTransitionEnd
                  ))),
            !0
          );
        },
      };
      function Q(t) {
        let { swiper: e, runCallbacks: s, direction: i, step: n } = t;
        const { activeIndex: a, previousIndex: l } = e;
        let r = i;
        if (
          (r || (r = a > l ? "next" : a < l ? "prev" : "reset"),
          e.emit(`transition${n}`),
          s && a !== l)
        ) {
          if ("reset" === r) return void e.emit(`slideResetTransition${n}`);
          e.emit(`slideChangeTransition${n}`),
            "next" === r
              ? e.emit(`slideNextTransition${n}`)
              : e.emit(`slidePrevTransition${n}`);
        }
      }
      const Z = {
        slideTo: function (t, e, s, i, n) {
          if (
            (void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === s && (s = !0),
            "number" != typeof t && "string" != typeof t)
          )
            throw new Error(
              `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof t}] given.`
            );
          if ("string" == typeof t) {
            const e = parseInt(t, 10);
            if (!isFinite(e))
              throw new Error(
                `The passed-in 'index' (string) couldn't be converted to 'number'. [${t}] given.`
              );
            t = e;
          }
          const a = this;
          let l = t;
          l < 0 && (l = 0);
          const {
            params: r,
            snapGrid: o,
            slidesGrid: d,
            previousIndex: c,
            activeIndex: u,
            rtlTranslate: h,
            wrapperEl: p,
            enabled: m,
          } = a;
          if (
            (a.animating && r.preventInteractionOnTransition) ||
            (!m && !i && !n)
          )
            return !1;
          const g = Math.min(a.params.slidesPerGroupSkip, l);
          let f = g + Math.floor((l - g) / a.params.slidesPerGroup);
          f >= o.length && (f = o.length - 1),
            (u || r.initialSlide || 0) === (c || 0) &&
              s &&
              a.emit("beforeSlideChangeStart");
          const v = -o[f];
          if ((a.updateProgress(v), r.normalizeSlideIndex))
            for (let t = 0; t < d.length; t += 1) {
              const e = -Math.floor(100 * v),
                s = Math.floor(100 * d[t]),
                i = Math.floor(100 * d[t + 1]);
              void 0 !== d[t + 1]
                ? e >= s && e < i - (i - s) / 2
                  ? (l = t)
                  : e >= s && e < i && (l = t + 1)
                : e >= s && (l = t);
            }
          if (a.initialized && l !== u) {
            if (!a.allowSlideNext && v < a.translate && v < a.minTranslate())
              return !1;
            if (
              !a.allowSlidePrev &&
              v > a.translate &&
              v > a.maxTranslate() &&
              (u || 0) !== l
            )
              return !1;
          }
          let b;
          if (
            ((b = l > u ? "next" : l < u ? "prev" : "reset"),
            (h && -v === a.translate) || (!h && v === a.translate))
          )
            return (
              a.updateActiveIndex(l),
              r.autoHeight && a.updateAutoHeight(),
              a.updateSlidesClasses(),
              "slide" !== r.effect && a.setTranslate(v),
              "reset" !== b && (a.transitionStart(s, b), a.transitionEnd(s, b)),
              !1
            );
          if (r.cssMode) {
            const t = a.isHorizontal(),
              s = h ? v : -v;
            if (0 === e) {
              const e = a.virtual && a.params.virtual.enabled;
              e &&
                ((a.wrapperEl.style.scrollSnapType = "none"),
                (a._immediateVirtual = !0)),
                (p[t ? "scrollLeft" : "scrollTop"] = s),
                e &&
                  requestAnimationFrame(() => {
                    (a.wrapperEl.style.scrollSnapType = ""),
                      (a._swiperImmediateVirtual = !1);
                  });
            } else {
              if (!a.support.smoothScroll)
                return (
                  N({ swiper: a, targetPosition: s, side: t ? "left" : "top" }),
                  !0
                );
              p.scrollTo({ [t ? "left" : "top"]: s, behavior: "smooth" });
            }
            return !0;
          }
          return (
            a.setTransition(e),
            a.setTranslate(v),
            a.updateActiveIndex(l),
            a.updateSlidesClasses(),
            a.emit("beforeTransitionStart", e, i),
            a.transitionStart(s, b),
            0 === e
              ? a.transitionEnd(s, b)
              : a.animating ||
                ((a.animating = !0),
                a.onSlideToWrapperTransitionEnd ||
                  (a.onSlideToWrapperTransitionEnd = function (t) {
                    a &&
                      !a.destroyed &&
                      t.target === this &&
                      (a.$wrapperEl[0].removeEventListener(
                        "transitionend",
                        a.onSlideToWrapperTransitionEnd
                      ),
                      a.$wrapperEl[0].removeEventListener(
                        "webkitTransitionEnd",
                        a.onSlideToWrapperTransitionEnd
                      ),
                      (a.onSlideToWrapperTransitionEnd = null),
                      delete a.onSlideToWrapperTransitionEnd,
                      a.transitionEnd(s, b));
                  }),
                a.$wrapperEl[0].addEventListener(
                  "transitionend",
                  a.onSlideToWrapperTransitionEnd
                ),
                a.$wrapperEl[0].addEventListener(
                  "webkitTransitionEnd",
                  a.onSlideToWrapperTransitionEnd
                )),
            !0
          );
        },
        slideToLoop: function (t, e, s, i) {
          void 0 === t && (t = 0),
            void 0 === e && (e = this.params.speed),
            void 0 === s && (s = !0);
          const n = this;
          let a = t;
          return n.params.loop && (a += n.loopedSlides), n.slideTo(a, e, s, i);
        },
        slideNext: function (t, e, s) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          const i = this,
            { animating: n, enabled: a, params: l } = i;
          if (!a) return i;
          let r = l.slidesPerGroup;
          "auto" === l.slidesPerView &&
            1 === l.slidesPerGroup &&
            l.slidesPerGroupAuto &&
            (r = Math.max(i.slidesPerViewDynamic("current", !0), 1));
          const o = i.activeIndex < l.slidesPerGroupSkip ? 1 : r;
          if (l.loop) {
            if (n && l.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          return l.rewind && i.isEnd
            ? i.slideTo(0, t, e, s)
            : i.slideTo(i.activeIndex + o, t, e, s);
        },
        slidePrev: function (t, e, s) {
          void 0 === t && (t = this.params.speed), void 0 === e && (e = !0);
          const i = this,
            {
              params: n,
              animating: a,
              snapGrid: l,
              slidesGrid: r,
              rtlTranslate: o,
              enabled: d,
            } = i;
          if (!d) return i;
          if (n.loop) {
            if (a && n.loopPreventsSlide) return !1;
            i.loopFix(), (i._clientLeft = i.$wrapperEl[0].clientLeft);
          }
          function c(t) {
            return t < 0 ? -Math.floor(Math.abs(t)) : Math.floor(t);
          }
          const u = c(o ? i.translate : -i.translate),
            h = l.map((t) => c(t));
          let p = l[h.indexOf(u) - 1];
          if (void 0 === p && n.cssMode) {
            let t;
            l.forEach((e, s) => {
              u >= e && (t = s);
            }),
              void 0 !== t && (p = l[t > 0 ? t - 1 : t]);
          }
          let m = 0;
          if (
            (void 0 !== p &&
              ((m = r.indexOf(p)),
              m < 0 && (m = i.activeIndex - 1),
              "auto" === n.slidesPerView &&
                1 === n.slidesPerGroup &&
                n.slidesPerGroupAuto &&
                ((m = m - i.slidesPerViewDynamic("previous", !0) + 1),
                (m = Math.max(m, 0)))),
            n.rewind && i.isBeginning)
          ) {
            const n =
              i.params.virtual && i.params.virtual.enabled && i.virtual
                ? i.virtual.slides.length - 1
                : i.slides.length - 1;
            return i.slideTo(n, t, e, s);
          }
          return i.slideTo(m, t, e, s);
        },
        slideReset: function (t, e, s) {
          return (
            void 0 === t && (t = this.params.speed),
            void 0 === e && (e = !0),
            this.slideTo(this.activeIndex, t, e, s)
          );
        },
        slideToClosest: function (t, e, s, i) {
          void 0 === t && (t = this.params.speed),
            void 0 === e && (e = !0),
            void 0 === i && (i = 0.5);
          const n = this;
          let a = n.activeIndex;
          const l = Math.min(n.params.slidesPerGroupSkip, a),
            r = l + Math.floor((a - l) / n.params.slidesPerGroup),
            o = n.rtlTranslate ? n.translate : -n.translate;
          if (o >= n.snapGrid[r]) {
            const t = n.snapGrid[r];
            o - t > (n.snapGrid[r + 1] - t) * i &&
              (a += n.params.slidesPerGroup);
          } else {
            const t = n.snapGrid[r - 1];
            o - t <= (n.snapGrid[r] - t) * i && (a -= n.params.slidesPerGroup);
          }
          return (
            (a = Math.max(a, 0)),
            (a = Math.min(a, n.slidesGrid.length - 1)),
            n.slideTo(a, t, e, s)
          );
        },
        slideToClickedSlide: function () {
          const t = this,
            { params: e, $wrapperEl: s } = t,
            i =
              "auto" === e.slidesPerView
                ? t.slidesPerViewDynamic()
                : e.slidesPerView;
          let n,
            a = t.clickedIndex;
          if (e.loop) {
            if (t.animating) return;
            (n = parseInt(
              M(t.clickedSlide).attr("data-swiper-slide-index"),
              10
            )),
              e.centeredSlides
                ? a < t.loopedSlides - i / 2 ||
                  a > t.slides.length - t.loopedSlides + i / 2
                  ? (t.loopFix(),
                    (a = s
                      .children(
                        `.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`
                      )
                      .eq(0)
                      .index()),
                    P(() => {
                      t.slideTo(a);
                    }))
                  : t.slideTo(a)
                : a > t.slides.length - i
                ? (t.loopFix(),
                  (a = s
                    .children(
                      `.${e.slideClass}[data-swiper-slide-index="${n}"]:not(.${e.slideDuplicateClass})`
                    )
                    .eq(0)
                    .index()),
                  P(() => {
                    t.slideTo(a);
                  }))
                : t.slideTo(a);
          } else t.slideTo(a);
        },
      };
      const J = {
        loopCreate: function () {
          const t = this,
            e = T(),
            { params: s, $wrapperEl: i } = t,
            n = i.children().length > 0 ? M(i.children()[0].parentNode) : i;
          n.children(`.${s.slideClass}.${s.slideDuplicateClass}`).remove();
          let a = n.children(`.${s.slideClass}`);
          if (s.loopFillGroupWithBlank) {
            const t = s.slidesPerGroup - (a.length % s.slidesPerGroup);
            if (t !== s.slidesPerGroup) {
              for (let i = 0; i < t; i += 1) {
                const t = M(e.createElement("div")).addClass(
                  `${s.slideClass} ${s.slideBlankClass}`
                );
                n.append(t);
              }
              a = n.children(`.${s.slideClass}`);
            }
          }
          "auto" !== s.slidesPerView ||
            s.loopedSlides ||
            (s.loopedSlides = a.length),
            (t.loopedSlides = Math.ceil(
              parseFloat(s.loopedSlides || s.slidesPerView, 10)
            )),
            (t.loopedSlides += s.loopAdditionalSlides),
            t.loopedSlides > a.length && (t.loopedSlides = a.length);
          const l = [],
            r = [];
          a.each((e, s) => {
            const i = M(e);
            s < t.loopedSlides && r.push(e),
              s < a.length && s >= a.length - t.loopedSlides && l.push(e),
              i.attr("data-swiper-slide-index", s);
          });
          for (let t = 0; t < r.length; t += 1)
            n.append(M(r[t].cloneNode(!0)).addClass(s.slideDuplicateClass));
          for (let t = l.length - 1; t >= 0; t -= 1)
            n.prepend(M(l[t].cloneNode(!0)).addClass(s.slideDuplicateClass));
        },
        loopFix: function () {
          const t = this;
          t.emit("beforeLoopFix");
          const {
            activeIndex: e,
            slides: s,
            loopedSlides: i,
            allowSlidePrev: n,
            allowSlideNext: a,
            snapGrid: l,
            rtlTranslate: r,
          } = t;
          let o;
          (t.allowSlidePrev = !0), (t.allowSlideNext = !0);
          const d = -l[e] - t.getTranslate();
          if (e < i) {
            (o = s.length - 3 * i + e), (o += i);
            t.slideTo(o, 0, !1, !0) &&
              0 !== d &&
              t.setTranslate((r ? -t.translate : t.translate) - d);
          } else if (e >= s.length - i) {
            (o = -s.length + e + i), (o += i);
            t.slideTo(o, 0, !1, !0) &&
              0 !== d &&
              t.setTranslate((r ? -t.translate : t.translate) - d);
          }
          (t.allowSlidePrev = n), (t.allowSlideNext = a), t.emit("loopFix");
        },
        loopDestroy: function () {
          const { $wrapperEl: t, params: e, slides: s } = this;
          t
            .children(
              `.${e.slideClass}.${e.slideDuplicateClass},.${e.slideClass}.${e.slideBlankClass}`
            )
            .remove(),
            s.removeAttr("data-swiper-slide-index");
        },
      };
      function tt(t) {
        const e = this,
          s = T(),
          i = E(),
          n = e.touchEventsData,
          { params: a, touches: l, enabled: r } = e;
        if (!r) return;
        if (e.animating && a.preventInteractionOnTransition) return;
        !e.animating && a.cssMode && a.loop && e.loopFix();
        let o = t;
        o.originalEvent && (o = o.originalEvent);
        let d = M(o.target);
        if ("wrapper" === a.touchEventsTarget && !d.closest(e.wrapperEl).length)
          return;
        if (
          ((n.isTouchEvent = "touchstart" === o.type),
          !n.isTouchEvent && "which" in o && 3 === o.which)
        )
          return;
        if (!n.isTouchEvent && "button" in o && o.button > 0) return;
        if (n.isTouched && n.isMoved) return;
        !!a.noSwipingClass &&
          "" !== a.noSwipingClass &&
          o.target &&
          o.target.shadowRoot &&
          t.path &&
          t.path[0] &&
          (d = M(t.path[0]));
        const c = a.noSwipingSelector
            ? a.noSwipingSelector
            : `.${a.noSwipingClass}`,
          u = !(!o.target || !o.target.shadowRoot);
        if (
          a.noSwiping &&
          (u
            ? (function (t, e) {
                return (
                  void 0 === e && (e = this),
                  (function e(s) {
                    return s && s !== T() && s !== E()
                      ? (s.assignedSlot && (s = s.assignedSlot),
                        s.closest(t) || e(s.getRootNode().host))
                      : null;
                  })(e)
                );
              })(c, o.target)
            : d.closest(c)[0])
        )
          return void (e.allowClick = !0);
        if (a.swipeHandler && !d.closest(a.swipeHandler)[0]) return;
        (l.currentX =
          "touchstart" === o.type ? o.targetTouches[0].pageX : o.pageX),
          (l.currentY =
            "touchstart" === o.type ? o.targetTouches[0].pageY : o.pageY);
        const h = l.currentX,
          p = l.currentY,
          m = a.edgeSwipeDetection || a.iOSEdgeSwipeDetection,
          g = a.edgeSwipeThreshold || a.iOSEdgeSwipeThreshold;
        if (m && (h <= g || h >= i.innerWidth - g)) {
          if ("prevent" !== m) return;
          t.preventDefault();
        }
        if (
          (Object.assign(n, {
            isTouched: !0,
            isMoved: !1,
            allowTouchCallbacks: !0,
            isScrolling: void 0,
            startMoving: void 0,
          }),
          (l.startX = h),
          (l.startY = p),
          (n.touchStartTime = D()),
          (e.allowClick = !0),
          e.updateSize(),
          (e.swipeDirection = void 0),
          a.threshold > 0 && (n.allowThresholdMove = !1),
          "touchstart" !== o.type)
        ) {
          let t = !0;
          d.is(n.focusableElements) &&
            ((t = !1), "SELECT" === d[0].nodeName && (n.isTouched = !1)),
            s.activeElement &&
              M(s.activeElement).is(n.focusableElements) &&
              s.activeElement !== d[0] &&
              s.activeElement.blur();
          const i = t && e.allowTouchMove && a.touchStartPreventDefault;
          (!a.touchStartForcePreventDefault && !i) ||
            d[0].isContentEditable ||
            o.preventDefault();
        }
        e.params.freeMode &&
          e.params.freeMode.enabled &&
          e.freeMode &&
          e.animating &&
          !a.cssMode &&
          e.freeMode.onTouchStart(),
          e.emit("touchStart", o);
      }
      function et(t) {
        const e = T(),
          s = this,
          i = s.touchEventsData,
          { params: n, touches: a, rtlTranslate: l, enabled: r } = s;
        if (!r) return;
        let o = t;
        if ((o.originalEvent && (o = o.originalEvent), !i.isTouched))
          return void (
            i.startMoving &&
            i.isScrolling &&
            s.emit("touchMoveOpposite", o)
          );
        if (i.isTouchEvent && "touchmove" !== o.type) return;
        const d =
            "touchmove" === o.type &&
            o.targetTouches &&
            (o.targetTouches[0] || o.changedTouches[0]),
          c = "touchmove" === o.type ? d.pageX : o.pageX,
          u = "touchmove" === o.type ? d.pageY : o.pageY;
        if (o.preventedByNestedSwiper)
          return (a.startX = c), void (a.startY = u);
        if (!s.allowTouchMove)
          return (
            M(o.target).is(i.focusableElements) || (s.allowClick = !1),
            void (
              i.isTouched &&
              (Object.assign(a, {
                startX: c,
                startY: u,
                currentX: c,
                currentY: u,
              }),
              (i.touchStartTime = D()))
            )
          );
        if (i.isTouchEvent && n.touchReleaseOnEdges && !n.loop)
          if (s.isVertical()) {
            if (
              (u < a.startY && s.translate <= s.maxTranslate()) ||
              (u > a.startY && s.translate >= s.minTranslate())
            )
              return (i.isTouched = !1), void (i.isMoved = !1);
          } else if (
            (c < a.startX && s.translate <= s.maxTranslate()) ||
            (c > a.startX && s.translate >= s.minTranslate())
          )
            return;
        if (
          i.isTouchEvent &&
          e.activeElement &&
          o.target === e.activeElement &&
          M(o.target).is(i.focusableElements)
        )
          return (i.isMoved = !0), void (s.allowClick = !1);
        if (
          (i.allowTouchCallbacks && s.emit("touchMove", o),
          o.targetTouches && o.targetTouches.length > 1)
        )
          return;
        (a.currentX = c), (a.currentY = u);
        const h = a.currentX - a.startX,
          p = a.currentY - a.startY;
        if (
          s.params.threshold &&
          Math.sqrt(h ** 2 + p ** 2) < s.params.threshold
        )
          return;
        if (void 0 === i.isScrolling) {
          let t;
          (s.isHorizontal() && a.currentY === a.startY) ||
          (s.isVertical() && a.currentX === a.startX)
            ? (i.isScrolling = !1)
            : h * h + p * p >= 25 &&
              ((t = (180 * Math.atan2(Math.abs(p), Math.abs(h))) / Math.PI),
              (i.isScrolling = s.isHorizontal()
                ? t > n.touchAngle
                : 90 - t > n.touchAngle));
        }
        if (
          (i.isScrolling && s.emit("touchMoveOpposite", o),
          void 0 === i.startMoving &&
            ((a.currentX === a.startX && a.currentY === a.startY) ||
              (i.startMoving = !0)),
          i.isScrolling)
        )
          return void (i.isTouched = !1);
        if (!i.startMoving) return;
        (s.allowClick = !1),
          !n.cssMode && o.cancelable && o.preventDefault(),
          n.touchMoveStopPropagation && !n.nested && o.stopPropagation(),
          i.isMoved ||
            (n.loop && !n.cssMode && s.loopFix(),
            (i.startTranslate = s.getTranslate()),
            s.setTransition(0),
            s.animating &&
              s.$wrapperEl.trigger("webkitTransitionEnd transitionend"),
            (i.allowMomentumBounce = !1),
            !n.grabCursor ||
              (!0 !== s.allowSlideNext && !0 !== s.allowSlidePrev) ||
              s.setGrabCursor(!0),
            s.emit("sliderFirstMove", o)),
          s.emit("sliderMove", o),
          (i.isMoved = !0);
        let m = s.isHorizontal() ? h : p;
        (a.diff = m),
          (m *= n.touchRatio),
          l && (m = -m),
          (s.swipeDirection = m > 0 ? "prev" : "next"),
          (i.currentTranslate = m + i.startTranslate);
        let g = !0,
          f = n.resistanceRatio;
        if (
          (n.touchReleaseOnEdges && (f = 0),
          m > 0 && i.currentTranslate > s.minTranslate()
            ? ((g = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.minTranslate() -
                  1 +
                  (-s.minTranslate() + i.startTranslate + m) ** f))
            : m < 0 &&
              i.currentTranslate < s.maxTranslate() &&
              ((g = !1),
              n.resistance &&
                (i.currentTranslate =
                  s.maxTranslate() +
                  1 -
                  (s.maxTranslate() - i.startTranslate - m) ** f)),
          g && (o.preventedByNestedSwiper = !0),
          !s.allowSlideNext &&
            "next" === s.swipeDirection &&
            i.currentTranslate < i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          !s.allowSlidePrev &&
            "prev" === s.swipeDirection &&
            i.currentTranslate > i.startTranslate &&
            (i.currentTranslate = i.startTranslate),
          s.allowSlidePrev ||
            s.allowSlideNext ||
            (i.currentTranslate = i.startTranslate),
          n.threshold > 0)
        ) {
          if (!(Math.abs(m) > n.threshold || i.allowThresholdMove))
            return void (i.currentTranslate = i.startTranslate);
          if (!i.allowThresholdMove)
            return (
              (i.allowThresholdMove = !0),
              (a.startX = a.currentX),
              (a.startY = a.currentY),
              (i.currentTranslate = i.startTranslate),
              void (a.diff = s.isHorizontal()
                ? a.currentX - a.startX
                : a.currentY - a.startY)
            );
        }
        n.followFinger &&
          !n.cssMode &&
          (((n.freeMode && n.freeMode.enabled && s.freeMode) ||
            n.watchSlidesProgress) &&
            (s.updateActiveIndex(), s.updateSlidesClasses()),
          s.params.freeMode &&
            n.freeMode.enabled &&
            s.freeMode &&
            s.freeMode.onTouchMove(),
          s.updateProgress(i.currentTranslate),
          s.setTranslate(i.currentTranslate));
      }
      function st(t) {
        const e = this,
          s = e.touchEventsData,
          {
            params: i,
            touches: n,
            rtlTranslate: a,
            slidesGrid: l,
            enabled: r,
          } = e;
        if (!r) return;
        let o = t;
        if (
          (o.originalEvent && (o = o.originalEvent),
          s.allowTouchCallbacks && e.emit("touchEnd", o),
          (s.allowTouchCallbacks = !1),
          !s.isTouched)
        )
          return (
            s.isMoved && i.grabCursor && e.setGrabCursor(!1),
            (s.isMoved = !1),
            void (s.startMoving = !1)
          );
        i.grabCursor &&
          s.isMoved &&
          s.isTouched &&
          (!0 === e.allowSlideNext || !0 === e.allowSlidePrev) &&
          e.setGrabCursor(!1);
        const d = D(),
          c = d - s.touchStartTime;
        if (e.allowClick) {
          const t = o.path || (o.composedPath && o.composedPath());
          e.updateClickedSlide((t && t[0]) || o.target),
            e.emit("tap click", o),
            c < 300 &&
              d - s.lastClickTime < 300 &&
              e.emit("doubleTap doubleClick", o);
        }
        if (
          ((s.lastClickTime = D()),
          P(() => {
            e.destroyed || (e.allowClick = !0);
          }),
          !s.isTouched ||
            !s.isMoved ||
            !e.swipeDirection ||
            0 === n.diff ||
            s.currentTranslate === s.startTranslate)
        )
          return (
            (s.isTouched = !1), (s.isMoved = !1), void (s.startMoving = !1)
          );
        let u;
        if (
          ((s.isTouched = !1),
          (s.isMoved = !1),
          (s.startMoving = !1),
          (u = i.followFinger
            ? a
              ? e.translate
              : -e.translate
            : -s.currentTranslate),
          i.cssMode)
        )
          return;
        if (e.params.freeMode && i.freeMode.enabled)
          return void e.freeMode.onTouchEnd({ currentPos: u });
        let h = 0,
          p = e.slidesSizesGrid[0];
        for (
          let t = 0;
          t < l.length;
          t += t < i.slidesPerGroupSkip ? 1 : i.slidesPerGroup
        ) {
          const e = t < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
          void 0 !== l[t + e]
            ? u >= l[t] && u < l[t + e] && ((h = t), (p = l[t + e] - l[t]))
            : u >= l[t] && ((h = t), (p = l[l.length - 1] - l[l.length - 2]));
        }
        let m = null,
          g = null;
        i.rewind &&
          (e.isBeginning
            ? (g =
                e.params.virtual && e.params.virtual.enabled && e.virtual
                  ? e.virtual.slides.length - 1
                  : e.slides.length - 1)
            : e.isEnd && (m = 0));
        const f = (u - l[h]) / p,
          v = h < i.slidesPerGroupSkip - 1 ? 1 : i.slidesPerGroup;
        if (c > i.longSwipesMs) {
          if (!i.longSwipes) return void e.slideTo(e.activeIndex);
          "next" === e.swipeDirection &&
            (f >= i.longSwipesRatio
              ? e.slideTo(i.rewind && e.isEnd ? m : h + v)
              : e.slideTo(h)),
            "prev" === e.swipeDirection &&
              (f > 1 - i.longSwipesRatio
                ? e.slideTo(h + v)
                : null !== g && f < 0 && Math.abs(f) > i.longSwipesRatio
                ? e.slideTo(g)
                : e.slideTo(h));
        } else {
          if (!i.shortSwipes) return void e.slideTo(e.activeIndex);
          e.navigation &&
          (o.target === e.navigation.nextEl || o.target === e.navigation.prevEl)
            ? o.target === e.navigation.nextEl
              ? e.slideTo(h + v)
              : e.slideTo(h)
            : ("next" === e.swipeDirection && e.slideTo(null !== m ? m : h + v),
              "prev" === e.swipeDirection && e.slideTo(null !== g ? g : h));
        }
      }
      function it() {
        const t = this,
          { params: e, el: s } = t;
        if (s && 0 === s.offsetWidth) return;
        e.breakpoints && t.setBreakpoint();
        const { allowSlideNext: i, allowSlidePrev: n, snapGrid: a } = t;
        (t.allowSlideNext = !0),
          (t.allowSlidePrev = !0),
          t.updateSize(),
          t.updateSlides(),
          t.updateSlidesClasses(),
          ("auto" === e.slidesPerView || e.slidesPerView > 1) &&
          t.isEnd &&
          !t.isBeginning &&
          !t.params.centeredSlides
            ? t.slideTo(t.slides.length - 1, 0, !1, !0)
            : t.slideTo(t.activeIndex, 0, !1, !0),
          t.autoplay &&
            t.autoplay.running &&
            t.autoplay.paused &&
            t.autoplay.run(),
          (t.allowSlidePrev = n),
          (t.allowSlideNext = i),
          t.params.watchOverflow && a !== t.snapGrid && t.checkOverflow();
      }
      function nt(t) {
        const e = this;
        e.enabled &&
          (e.allowClick ||
            (e.params.preventClicks && t.preventDefault(),
            e.params.preventClicksPropagation &&
              e.animating &&
              (t.stopPropagation(), t.stopImmediatePropagation())));
      }
      function at() {
        const t = this,
          { wrapperEl: e, rtlTranslate: s, enabled: i } = t;
        if (!i) return;
        let n;
        (t.previousTranslate = t.translate),
          t.isHorizontal()
            ? (t.translate = -e.scrollLeft)
            : (t.translate = -e.scrollTop),
          -0 === t.translate && (t.translate = 0),
          t.updateActiveIndex(),
          t.updateSlidesClasses();
        const a = t.maxTranslate() - t.minTranslate();
        (n = 0 === a ? 0 : (t.translate - t.minTranslate()) / a),
          n !== t.progress && t.updateProgress(s ? -t.translate : t.translate),
          t.emit("setTranslate", t.translate, !1);
      }
      let lt = !1;
      function rt() {}
      const ot = (t, e) => {
        const s = T(),
          {
            params: i,
            touchEvents: n,
            el: a,
            wrapperEl: l,
            device: r,
            support: o,
          } = t,
          d = !!i.nested,
          c = "on" === e ? "addEventListener" : "removeEventListener",
          u = e;
        if (o.touch) {
          const e = !(
            "touchstart" !== n.start ||
            !o.passiveListener ||
            !i.passiveListeners
          ) && { passive: !0, capture: !1 };
          a[c](n.start, t.onTouchStart, e),
            a[c](
              n.move,
              t.onTouchMove,
              o.passiveListener ? { passive: !1, capture: d } : d
            ),
            a[c](n.end, t.onTouchEnd, e),
            n.cancel && a[c](n.cancel, t.onTouchEnd, e);
        } else
          a[c](n.start, t.onTouchStart, !1),
            s[c](n.move, t.onTouchMove, d),
            s[c](n.end, t.onTouchEnd, !1);
        (i.preventClicks || i.preventClicksPropagation) &&
          a[c]("click", t.onClick, !0),
          i.cssMode && l[c]("scroll", t.onScroll),
          i.updateOnWindowResize
            ? t[u](
                r.ios || r.android
                  ? "resize orientationchange observerUpdate"
                  : "resize observerUpdate",
                it,
                !0
              )
            : t[u]("observerUpdate", it, !0);
      };
      const dt = {
          attachEvents: function () {
            const t = this,
              e = T(),
              { params: s, support: i } = t;
            (t.onTouchStart = tt.bind(t)),
              (t.onTouchMove = et.bind(t)),
              (t.onTouchEnd = st.bind(t)),
              s.cssMode && (t.onScroll = at.bind(t)),
              (t.onClick = nt.bind(t)),
              i.touch &&
                !lt &&
                (e.addEventListener("touchstart", rt), (lt = !0)),
              ot(t, "on");
          },
          detachEvents: function () {
            ot(this, "off");
          },
        },
        ct = (t, e) => t.grid && e.grid && e.grid.rows > 1;
      const ut = {
        setBreakpoint: function () {
          const t = this,
            {
              activeIndex: e,
              initialized: s,
              loopedSlides: i = 0,
              params: n,
              $el: a,
            } = t,
            l = n.breakpoints;
          if (!l || (l && 0 === Object.keys(l).length)) return;
          const r = t.getBreakpoint(l, t.params.breakpointsBase, t.el);
          if (!r || t.currentBreakpoint === r) return;
          const o = (r in l ? l[r] : void 0) || t.originalParams,
            d = ct(t, n),
            c = ct(t, o),
            u = n.enabled;
          d && !c
            ? (a.removeClass(
                `${n.containerModifierClass}grid ${n.containerModifierClass}grid-column`
              ),
              t.emitContainerClasses())
            : !d &&
              c &&
              (a.addClass(`${n.containerModifierClass}grid`),
              ((o.grid.fill && "column" === o.grid.fill) ||
                (!o.grid.fill && "column" === n.grid.fill)) &&
                a.addClass(`${n.containerModifierClass}grid-column`),
              t.emitContainerClasses());
          const h = o.direction && o.direction !== n.direction,
            p = n.loop && (o.slidesPerView !== n.slidesPerView || h);
          h && s && t.changeDirection(), q(t.params, o);
          const m = t.params.enabled;
          Object.assign(t, {
            allowTouchMove: t.params.allowTouchMove,
            allowSlideNext: t.params.allowSlideNext,
            allowSlidePrev: t.params.allowSlidePrev,
          }),
            u && !m ? t.disable() : !u && m && t.enable(),
            (t.currentBreakpoint = r),
            t.emit("_beforeBreakpoint", o),
            p &&
              s &&
              (t.loopDestroy(),
              t.loopCreate(),
              t.updateSlides(),
              t.slideTo(e - i + t.loopedSlides, 0, !1)),
            t.emit("breakpoint", o);
        },
        getBreakpoint: function (t, e, s) {
          if ((void 0 === e && (e = "window"), !t || ("container" === e && !s)))
            return;
          let i = !1;
          const n = E(),
            a = "window" === e ? n.innerHeight : s.clientHeight,
            l = Object.keys(t).map((t) => {
              if ("string" == typeof t && 0 === t.indexOf("@")) {
                const e = parseFloat(t.substr(1));
                return { value: a * e, point: t };
              }
              return { value: t, point: t };
            });
          l.sort((t, e) => parseInt(t.value, 10) - parseInt(e.value, 10));
          for (let t = 0; t < l.length; t += 1) {
            const { point: a, value: r } = l[t];
            "window" === e
              ? n.matchMedia(`(min-width: ${r}px)`).matches && (i = a)
              : r <= s.clientWidth && (i = a);
          }
          return i || "max";
        },
      };
      const ht = {
        addClasses: function () {
          const t = this,
            {
              classNames: e,
              params: s,
              rtl: i,
              $el: n,
              device: a,
              support: l,
            } = t,
            r = (function (t, e) {
              const s = [];
              return (
                t.forEach((t) => {
                  "object" == typeof t
                    ? Object.keys(t).forEach((i) => {
                        t[i] && s.push(e + i);
                      })
                    : "string" == typeof t && s.push(e + t);
                }),
                s
              );
            })(
              [
                "initialized",
                s.direction,
                { "pointer-events": !l.touch },
                { "free-mode": t.params.freeMode && s.freeMode.enabled },
                { autoheight: s.autoHeight },
                { rtl: i },
                { grid: s.grid && s.grid.rows > 1 },
                {
                  "grid-column":
                    s.grid && s.grid.rows > 1 && "column" === s.grid.fill,
                },
                { android: a.android },
                { ios: a.ios },
                { "css-mode": s.cssMode },
                { centered: s.cssMode && s.centeredSlides },
              ],
              s.containerModifierClass
            );
          e.push(...r), n.addClass([...e].join(" ")), t.emitContainerClasses();
        },
        removeClasses: function () {
          const { $el: t, classNames: e } = this;
          t.removeClass(e.join(" ")), this.emitContainerClasses();
        },
      };
      const pt = {
        init: !0,
        direction: "horizontal",
        touchEventsTarget: "wrapper",
        initialSlide: 0,
        speed: 300,
        cssMode: !1,
        updateOnWindowResize: !0,
        resizeObserver: !0,
        nested: !1,
        createElements: !1,
        enabled: !0,
        focusableElements:
          "input, select, option, textarea, button, video, label",
        width: null,
        height: null,
        preventInteractionOnTransition: !1,
        userAgent: null,
        url: null,
        edgeSwipeDetection: !1,
        edgeSwipeThreshold: 20,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: "slide",
        breakpoints: void 0,
        breakpointsBase: "window",
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerGroupSkip: 0,
        slidesPerGroupAuto: !1,
        centeredSlides: !1,
        centeredSlidesBounds: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        normalizeSlideIndex: !0,
        centerInsufficientSlides: !1,
        watchOverflow: !0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        allowTouchMove: !0,
        threshold: 0,
        touchMoveStopPropagation: !1,
        touchStartPreventDefault: !0,
        touchStartForcePreventDefault: !1,
        touchReleaseOnEdges: !1,
        uniqueNavElements: !0,
        resistance: !0,
        resistanceRatio: 0.85,
        watchSlidesProgress: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        loopFillGroupWithBlank: !1,
        loopPreventsSlide: !0,
        rewind: !1,
        allowSlidePrev: !0,
        allowSlideNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: "swiper-no-swiping",
        noSwipingSelector: null,
        passiveListeners: !0,
        maxBackfaceHiddenSlides: 10,
        containerModifierClass: "swiper-",
        slideClass: "swiper-slide",
        slideBlankClass: "swiper-slide-invisible-blank",
        slideActiveClass: "swiper-slide-active",
        slideDuplicateActiveClass: "swiper-slide-duplicate-active",
        slideVisibleClass: "swiper-slide-visible",
        slideDuplicateClass: "swiper-slide-duplicate",
        slideNextClass: "swiper-slide-next",
        slideDuplicateNextClass: "swiper-slide-duplicate-next",
        slidePrevClass: "swiper-slide-prev",
        slideDuplicatePrevClass: "swiper-slide-duplicate-prev",
        wrapperClass: "swiper-wrapper",
        runCallbacksOnInit: !0,
        _emitClasses: !1,
      };
      function mt(t, e) {
        return function (s) {
          void 0 === s && (s = {});
          const i = Object.keys(s)[0],
            n = s[i];
          "object" == typeof n && null !== n
            ? (["navigation", "pagination", "scrollbar"].indexOf(i) >= 0 &&
                !0 === t[i] &&
                (t[i] = { auto: !0 }),
              i in t && "enabled" in n
                ? (!0 === t[i] && (t[i] = { enabled: !0 }),
                  "object" != typeof t[i] ||
                    "enabled" in t[i] ||
                    (t[i].enabled = !0),
                  t[i] || (t[i] = { enabled: !1 }),
                  q(e, s))
                : q(e, s))
            : q(e, s);
        };
      }
      const gt = {
          eventsEmitter: Y,
          update: U,
          translate: K,
          transition: {
            setTransition: function (t, e) {
              const s = this;
              s.params.cssMode || s.$wrapperEl.transition(t),
                s.emit("setTransition", t, e);
            },
            transitionStart: function (t, e) {
              void 0 === t && (t = !0);
              const s = this,
                { params: i } = s;
              i.cssMode ||
                (i.autoHeight && s.updateAutoHeight(),
                Q({ swiper: s, runCallbacks: t, direction: e, step: "Start" }));
            },
            transitionEnd: function (t, e) {
              void 0 === t && (t = !0);
              const s = this,
                { params: i } = s;
              (s.animating = !1),
                i.cssMode ||
                  (s.setTransition(0),
                  Q({ swiper: s, runCallbacks: t, direction: e, step: "End" }));
            },
          },
          slide: Z,
          loop: J,
          grabCursor: {
            setGrabCursor: function (t) {
              const e = this;
              if (
                e.support.touch ||
                !e.params.simulateTouch ||
                (e.params.watchOverflow && e.isLocked) ||
                e.params.cssMode
              )
                return;
              const s =
                "container" === e.params.touchEventsTarget ? e.el : e.wrapperEl;
              (s.style.cursor = "move"),
                (s.style.cursor = t ? "-webkit-grabbing" : "-webkit-grab"),
                (s.style.cursor = t ? "-moz-grabbin" : "-moz-grab"),
                (s.style.cursor = t ? "grabbing" : "grab");
            },
            unsetGrabCursor: function () {
              const t = this;
              t.support.touch ||
                (t.params.watchOverflow && t.isLocked) ||
                t.params.cssMode ||
                (t[
                  "container" === t.params.touchEventsTarget
                    ? "el"
                    : "wrapperEl"
                ].style.cursor = "");
            },
          },
          events: dt,
          breakpoints: ut,
          checkOverflow: {
            checkOverflow: function () {
              const t = this,
                { isLocked: e, params: s } = t,
                { slidesOffsetBefore: i } = s;
              if (i) {
                const e = t.slides.length - 1,
                  s = t.slidesGrid[e] + t.slidesSizesGrid[e] + 2 * i;
                t.isLocked = t.size > s;
              } else t.isLocked = 1 === t.snapGrid.length;
              !0 === s.allowSlideNext && (t.allowSlideNext = !t.isLocked),
                !0 === s.allowSlidePrev && (t.allowSlidePrev = !t.isLocked),
                e && e !== t.isLocked && (t.isEnd = !1),
                e !== t.isLocked && t.emit(t.isLocked ? "lock" : "unlock");
            },
          },
          classes: ht,
          images: {
            loadImage: function (t, e, s, i, n, a) {
              const l = E();
              let r;
              function o() {
                a && a();
              }
              M(t).parent("picture")[0] || (t.complete && n)
                ? o()
                : e
                ? ((r = new l.Image()),
                  (r.onload = o),
                  (r.onerror = o),
                  i && (r.sizes = i),
                  s && (r.srcset = s),
                  e && (r.src = e))
                : o();
            },
            preloadImages: function () {
              const t = this;
              function e() {
                null != t &&
                  t &&
                  !t.destroyed &&
                  (void 0 !== t.imagesLoaded && (t.imagesLoaded += 1),
                  t.imagesLoaded === t.imagesToLoad.length &&
                    (t.params.updateOnImagesReady && t.update(),
                    t.emit("imagesReady")));
              }
              t.imagesToLoad = t.$el.find("img");
              for (let s = 0; s < t.imagesToLoad.length; s += 1) {
                const i = t.imagesToLoad[s];
                t.loadImage(
                  i,
                  i.currentSrc || i.getAttribute("src"),
                  i.srcset || i.getAttribute("srcset"),
                  i.sizes || i.getAttribute("sizes"),
                  !0,
                  e
                );
              }
            },
          },
        },
        ft = {};
      class vt {
        constructor() {
          let t, e;
          for (var s = arguments.length, i = new Array(s), n = 0; n < s; n++)
            i[n] = arguments[n];
          if (
            (1 === i.length &&
            i[0].constructor &&
            "Object" === Object.prototype.toString.call(i[0]).slice(8, -1)
              ? (e = i[0])
              : ([t, e] = i),
            e || (e = {}),
            (e = q({}, e)),
            t && !e.el && (e.el = t),
            e.el && M(e.el).length > 1)
          ) {
            const t = [];
            return (
              M(e.el).each((s) => {
                const i = q({}, e, { el: s });
                t.push(new vt(i));
              }),
              t
            );
          }
          const a = this;
          (a.__swiper__ = !0),
            (a.support = V()),
            (a.device = X({ userAgent: e.userAgent })),
            (a.browser = R()),
            (a.eventsListeners = {}),
            (a.eventsAnyListeners = []),
            (a.modules = [...a.__modules__]),
            e.modules &&
              Array.isArray(e.modules) &&
              a.modules.push(...e.modules);
          const l = {};
          a.modules.forEach((t) => {
            t({
              swiper: a,
              extendParams: mt(e, l),
              on: a.on.bind(a),
              once: a.once.bind(a),
              off: a.off.bind(a),
              emit: a.emit.bind(a),
            });
          });
          const r = q({}, pt, l);
          return (
            (a.params = q({}, r, ft, e)),
            (a.originalParams = q({}, a.params)),
            (a.passedParams = q({}, e)),
            a.params &&
              a.params.on &&
              Object.keys(a.params.on).forEach((t) => {
                a.on(t, a.params.on[t]);
              }),
            a.params && a.params.onAny && a.onAny(a.params.onAny),
            (a.$ = M),
            Object.assign(a, {
              enabled: a.params.enabled,
              el: t,
              classNames: [],
              slides: M(),
              slidesGrid: [],
              snapGrid: [],
              slidesSizesGrid: [],
              isHorizontal: () => "horizontal" === a.params.direction,
              isVertical: () => "vertical" === a.params.direction,
              activeIndex: 0,
              realIndex: 0,
              isBeginning: !0,
              isEnd: !1,
              translate: 0,
              previousTranslate: 0,
              progress: 0,
              velocity: 0,
              animating: !1,
              allowSlideNext: a.params.allowSlideNext,
              allowSlidePrev: a.params.allowSlidePrev,
              touchEvents: (function () {
                const t = [
                    "touchstart",
                    "touchmove",
                    "touchend",
                    "touchcancel",
                  ],
                  e = ["pointerdown", "pointermove", "pointerup"];
                return (
                  (a.touchEventsTouch = {
                    start: t[0],
                    move: t[1],
                    end: t[2],
                    cancel: t[3],
                  }),
                  (a.touchEventsDesktop = {
                    start: e[0],
                    move: e[1],
                    end: e[2],
                  }),
                  a.support.touch || !a.params.simulateTouch
                    ? a.touchEventsTouch
                    : a.touchEventsDesktop
                );
              })(),
              touchEventsData: {
                isTouched: void 0,
                isMoved: void 0,
                allowTouchCallbacks: void 0,
                touchStartTime: void 0,
                isScrolling: void 0,
                currentTranslate: void 0,
                startTranslate: void 0,
                allowThresholdMove: void 0,
                focusableElements: a.params.focusableElements,
                lastClickTime: D(),
                clickTimeout: void 0,
                velocities: [],
                allowMomentumBounce: void 0,
                isTouchEvent: void 0,
                startMoving: void 0,
              },
              allowClick: !0,
              allowTouchMove: a.params.allowTouchMove,
              touches: {
                startX: 0,
                startY: 0,
                currentX: 0,
                currentY: 0,
                diff: 0,
              },
              imagesToLoad: [],
              imagesLoaded: 0,
            }),
            a.emit("_swiper"),
            a.params.init && a.init(),
            a
          );
        }
        enable() {
          const t = this;
          t.enabled ||
            ((t.enabled = !0),
            t.params.grabCursor && t.setGrabCursor(),
            t.emit("enable"));
        }
        disable() {
          const t = this;
          t.enabled &&
            ((t.enabled = !1),
            t.params.grabCursor && t.unsetGrabCursor(),
            t.emit("disable"));
        }
        setProgress(t, e) {
          const s = this;
          t = Math.min(Math.max(t, 0), 1);
          const i = s.minTranslate(),
            n = (s.maxTranslate() - i) * t + i;
          s.translateTo(n, void 0 === e ? 0 : e),
            s.updateActiveIndex(),
            s.updateSlidesClasses();
        }
        emitContainerClasses() {
          const t = this;
          if (!t.params._emitClasses || !t.el) return;
          const e = t.el.className
            .split(" ")
            .filter(
              (e) =>
                0 === e.indexOf("swiper") ||
                0 === e.indexOf(t.params.containerModifierClass)
            );
          t.emit("_containerClasses", e.join(" "));
        }
        getSlideClasses(t) {
          const e = this;
          return t.className
            .split(" ")
            .filter(
              (t) =>
                0 === t.indexOf("swiper-slide") ||
                0 === t.indexOf(e.params.slideClass)
            )
            .join(" ");
        }
        emitSlidesClasses() {
          const t = this;
          if (!t.params._emitClasses || !t.el) return;
          const e = [];
          t.slides.each((s) => {
            const i = t.getSlideClasses(s);
            e.push({ slideEl: s, classNames: i }), t.emit("_slideClass", s, i);
          }),
            t.emit("_slideClasses", e);
        }
        slidesPerViewDynamic(t, e) {
          void 0 === t && (t = "current"), void 0 === e && (e = !1);
          const {
            params: s,
            slides: i,
            slidesGrid: n,
            slidesSizesGrid: a,
            size: l,
            activeIndex: r,
          } = this;
          let o = 1;
          if (s.centeredSlides) {
            let t,
              e = i[r].swiperSlideSize;
            for (let s = r + 1; s < i.length; s += 1)
              i[s] &&
                !t &&
                ((e += i[s].swiperSlideSize), (o += 1), e > l && (t = !0));
            for (let s = r - 1; s >= 0; s -= 1)
              i[s] &&
                !t &&
                ((e += i[s].swiperSlideSize), (o += 1), e > l && (t = !0));
          } else if ("current" === t)
            for (let t = r + 1; t < i.length; t += 1) {
              (e ? n[t] + a[t] - n[r] < l : n[t] - n[r] < l) && (o += 1);
            }
          else
            for (let t = r - 1; t >= 0; t -= 1) {
              n[r] - n[t] < l && (o += 1);
            }
          return o;
        }
        update() {
          const t = this;
          if (!t || t.destroyed) return;
          const { snapGrid: e, params: s } = t;
          function i() {
            const e = t.rtlTranslate ? -1 * t.translate : t.translate,
              s = Math.min(Math.max(e, t.maxTranslate()), t.minTranslate());
            t.setTranslate(s), t.updateActiveIndex(), t.updateSlidesClasses();
          }
          let n;
          s.breakpoints && t.setBreakpoint(),
            t.updateSize(),
            t.updateSlides(),
            t.updateProgress(),
            t.updateSlidesClasses(),
            t.params.freeMode && t.params.freeMode.enabled
              ? (i(), t.params.autoHeight && t.updateAutoHeight())
              : ((n =
                  ("auto" === t.params.slidesPerView ||
                    t.params.slidesPerView > 1) &&
                  t.isEnd &&
                  !t.params.centeredSlides
                    ? t.slideTo(t.slides.length - 1, 0, !1, !0)
                    : t.slideTo(t.activeIndex, 0, !1, !0)),
                n || i()),
            s.watchOverflow && e !== t.snapGrid && t.checkOverflow(),
            t.emit("update");
        }
        changeDirection(t, e) {
          void 0 === e && (e = !0);
          const s = this,
            i = s.params.direction;
          return (
            t || (t = "horizontal" === i ? "vertical" : "horizontal"),
            t === i ||
              ("horizontal" !== t && "vertical" !== t) ||
              (s.$el
                .removeClass(`${s.params.containerModifierClass}${i}`)
                .addClass(`${s.params.containerModifierClass}${t}`),
              s.emitContainerClasses(),
              (s.params.direction = t),
              s.slides.each((e) => {
                "vertical" === t ? (e.style.width = "") : (e.style.height = "");
              }),
              s.emit("changeDirection"),
              e && s.update()),
            s
          );
        }
        mount(t) {
          const e = this;
          if (e.mounted) return !0;
          const s = M(t || e.params.el);
          if (!(t = s[0])) return !1;
          t.swiper = e;
          const i = () =>
            `.${(e.params.wrapperClass || "").trim().split(" ").join(".")}`;
          let n = (() => {
            if (t && t.shadowRoot && t.shadowRoot.querySelector) {
              const e = M(t.shadowRoot.querySelector(i()));
              return (e.children = (t) => s.children(t)), e;
            }
            return s.children(i());
          })();
          if (0 === n.length && e.params.createElements) {
            const t = T().createElement("div");
            (n = M(t)),
              (t.className = e.params.wrapperClass),
              s.append(t),
              s.children(`.${e.params.slideClass}`).each((t) => {
                n.append(t);
              });
          }
          return (
            Object.assign(e, {
              $el: s,
              el: t,
              $wrapperEl: n,
              wrapperEl: n[0],
              mounted: !0,
              rtl:
                "rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction"),
              rtlTranslate:
                "horizontal" === e.params.direction &&
                ("rtl" === t.dir.toLowerCase() || "rtl" === s.css("direction")),
              wrongRTL: "-webkit-box" === n.css("display"),
            }),
            !0
          );
        }
        init(t) {
          const e = this;
          if (e.initialized) return e;
          return (
            !1 === e.mount(t) ||
              (e.emit("beforeInit"),
              e.params.breakpoints && e.setBreakpoint(),
              e.addClasses(),
              e.params.loop && e.loopCreate(),
              e.updateSize(),
              e.updateSlides(),
              e.params.watchOverflow && e.checkOverflow(),
              e.params.grabCursor && e.enabled && e.setGrabCursor(),
              e.params.preloadImages && e.preloadImages(),
              e.params.loop
                ? e.slideTo(
                    e.params.initialSlide + e.loopedSlides,
                    0,
                    e.params.runCallbacksOnInit,
                    !1,
                    !0
                  )
                : e.slideTo(
                    e.params.initialSlide,
                    0,
                    e.params.runCallbacksOnInit,
                    !1,
                    !0
                  ),
              e.attachEvents(),
              (e.initialized = !0),
              e.emit("init"),
              e.emit("afterInit")),
            e
          );
        }
        destroy(t, e) {
          void 0 === t && (t = !0), void 0 === e && (e = !0);
          const s = this,
            { params: i, $el: n, $wrapperEl: a, slides: l } = s;
          return (
            void 0 === s.params ||
              s.destroyed ||
              (s.emit("beforeDestroy"),
              (s.initialized = !1),
              s.detachEvents(),
              i.loop && s.loopDestroy(),
              e &&
                (s.removeClasses(),
                n.removeAttr("style"),
                a.removeAttr("style"),
                l &&
                  l.length &&
                  l
                    .removeClass(
                      [
                        i.slideVisibleClass,
                        i.slideActiveClass,
                        i.slideNextClass,
                        i.slidePrevClass,
                      ].join(" ")
                    )
                    .removeAttr("style")
                    .removeAttr("data-swiper-slide-index")),
              s.emit("destroy"),
              Object.keys(s.eventsListeners).forEach((t) => {
                s.off(t);
              }),
              !1 !== t &&
                ((s.$el[0].swiper = null),
                (function (t) {
                  const e = t;
                  Object.keys(e).forEach((t) => {
                    try {
                      e[t] = null;
                    } catch (t) {}
                    try {
                      delete e[t];
                    } catch (t) {}
                  });
                })(s)),
              (s.destroyed = !0)),
            null
          );
        }
        static extendDefaults(t) {
          q(ft, t);
        }
        static get extendedDefaults() {
          return ft;
        }
        static get defaults() {
          return pt;
        }
        static installModule(t) {
          vt.prototype.__modules__ || (vt.prototype.__modules__ = []);
          const e = vt.prototype.__modules__;
          "function" == typeof t && e.indexOf(t) < 0 && e.push(t);
        }
        static use(t) {
          return Array.isArray(t)
            ? (t.forEach((t) => vt.installModule(t)), vt)
            : (vt.installModule(t), vt);
        }
      }
      Object.keys(gt).forEach((t) => {
        Object.keys(gt[t]).forEach((e) => {
          vt.prototype[e] = gt[t][e];
        });
      }),
        vt.use([
          function (t) {
            let { swiper: e, on: s, emit: i } = t;
            const n = E();
            let a = null,
              l = null;
            const r = () => {
                e &&
                  !e.destroyed &&
                  e.initialized &&
                  (i("beforeResize"), i("resize"));
              },
              o = () => {
                e && !e.destroyed && e.initialized && i("orientationchange");
              };
            s("init", () => {
              e.params.resizeObserver && void 0 !== n.ResizeObserver
                ? e &&
                  !e.destroyed &&
                  e.initialized &&
                  ((a = new ResizeObserver((t) => {
                    l = n.requestAnimationFrame(() => {
                      const { width: s, height: i } = e;
                      let n = s,
                        a = i;
                      t.forEach((t) => {
                        let {
                          contentBoxSize: s,
                          contentRect: i,
                          target: l,
                        } = t;
                        (l && l !== e.el) ||
                          ((n = i ? i.width : (s[0] || s).inlineSize),
                          (a = i ? i.height : (s[0] || s).blockSize));
                      }),
                        (n === s && a === i) || r();
                    });
                  })),
                  a.observe(e.el))
                : (n.addEventListener("resize", r),
                  n.addEventListener("orientationchange", o));
            }),
              s("destroy", () => {
                l && n.cancelAnimationFrame(l),
                  a && a.unobserve && e.el && (a.unobserve(e.el), (a = null)),
                  n.removeEventListener("resize", r),
                  n.removeEventListener("orientationchange", o);
              });
          },
          function (t) {
            let { swiper: e, extendParams: s, on: i, emit: n } = t;
            const a = [],
              l = E(),
              r = function (t, e) {
                void 0 === e && (e = {});
                const s = new (l.MutationObserver || l.WebkitMutationObserver)(
                  (t) => {
                    if (1 === t.length) return void n("observerUpdate", t[0]);
                    const e = function () {
                      n("observerUpdate", t[0]);
                    };
                    l.requestAnimationFrame
                      ? l.requestAnimationFrame(e)
                      : l.setTimeout(e, 0);
                  }
                );
                s.observe(t, {
                  attributes: void 0 === e.attributes || e.attributes,
                  childList: void 0 === e.childList || e.childList,
                  characterData: void 0 === e.characterData || e.characterData,
                }),
                  a.push(s);
              };
            s({ observer: !1, observeParents: !1, observeSlideChildren: !1 }),
              i("init", () => {
                if (e.params.observer) {
                  if (e.params.observeParents) {
                    const t = e.$el.parents();
                    for (let e = 0; e < t.length; e += 1) r(t[e]);
                  }
                  r(e.$el[0], { childList: e.params.observeSlideChildren }),
                    r(e.$wrapperEl[0], { attributes: !1 });
                }
              }),
              i("destroy", () => {
                a.forEach((t) => {
                  t.disconnect();
                }),
                  a.splice(0, a.length);
              });
          },
        ]);
      const bt = vt;
      function yt(t, e, s, i) {
        const n = T();
        return (
          t.params.createElements &&
            Object.keys(i).forEach((a) => {
              if (!s[a] && !0 === s.auto) {
                let l = t.$el.children(`.${i[a]}`)[0];
                l ||
                  ((l = n.createElement("div")),
                  (l.className = i[a]),
                  t.$el.append(l)),
                  (s[a] = l),
                  (e[a] = l);
              }
            }),
          s
        );
      }
      function wt(t) {
        let { swiper: e, extendParams: s, on: i, emit: n } = t;
        function a(t) {
          let s;
          return (
            t &&
              ((s = M(t)),
              e.params.uniqueNavElements &&
                "string" == typeof t &&
                s.length > 1 &&
                1 === e.$el.find(t).length &&
                (s = e.$el.find(t))),
            s
          );
        }
        function l(t, s) {
          const i = e.params.navigation;
          t &&
            t.length > 0 &&
            (t[s ? "addClass" : "removeClass"](i.disabledClass),
            t[0] && "BUTTON" === t[0].tagName && (t[0].disabled = s),
            e.params.watchOverflow &&
              e.enabled &&
              t[e.isLocked ? "addClass" : "removeClass"](i.lockClass));
        }
        function r() {
          if (e.params.loop) return;
          const { $nextEl: t, $prevEl: s } = e.navigation;
          l(s, e.isBeginning && !e.params.rewind),
            l(t, e.isEnd && !e.params.rewind);
        }
        function o(t) {
          t.preventDefault(),
            (!e.isBeginning || e.params.loop || e.params.rewind) &&
              e.slidePrev();
        }
        function d(t) {
          t.preventDefault(),
            (!e.isEnd || e.params.loop || e.params.rewind) && e.slideNext();
        }
        function c() {
          const t = e.params.navigation;
          if (
            ((e.params.navigation = yt(
              e,
              e.originalParams.navigation,
              e.params.navigation,
              { nextEl: "swiper-button-next", prevEl: "swiper-button-prev" }
            )),
            !t.nextEl && !t.prevEl)
          )
            return;
          const s = a(t.nextEl),
            i = a(t.prevEl);
          s && s.length > 0 && s.on("click", d),
            i && i.length > 0 && i.on("click", o),
            Object.assign(e.navigation, {
              $nextEl: s,
              nextEl: s && s[0],
              $prevEl: i,
              prevEl: i && i[0],
            }),
            e.enabled ||
              (s && s.addClass(t.lockClass), i && i.addClass(t.lockClass));
        }
        function u() {
          const { $nextEl: t, $prevEl: s } = e.navigation;
          t &&
            t.length &&
            (t.off("click", d),
            t.removeClass(e.params.navigation.disabledClass)),
            s &&
              s.length &&
              (s.off("click", o),
              s.removeClass(e.params.navigation.disabledClass));
        }
        s({
          navigation: {
            nextEl: null,
            prevEl: null,
            hideOnClick: !1,
            disabledClass: "swiper-button-disabled",
            hiddenClass: "swiper-button-hidden",
            lockClass: "swiper-button-lock",
          },
        }),
          (e.navigation = {
            nextEl: null,
            $nextEl: null,
            prevEl: null,
            $prevEl: null,
          }),
          i("init", () => {
            c(), r();
          }),
          i("toEdge fromEdge lock unlock", () => {
            r();
          }),
          i("destroy", () => {
            u();
          }),
          i("enable disable", () => {
            const { $nextEl: t, $prevEl: s } = e.navigation;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.navigation.lockClass
              ),
              s &&
                s[e.enabled ? "removeClass" : "addClass"](
                  e.params.navigation.lockClass
                );
          }),
          i("click", (t, s) => {
            const { $nextEl: i, $prevEl: a } = e.navigation,
              l = s.target;
            if (e.params.navigation.hideOnClick && !M(l).is(a) && !M(l).is(i)) {
              if (
                e.pagination &&
                e.params.pagination &&
                e.params.pagination.clickable &&
                (e.pagination.el === l || e.pagination.el.contains(l))
              )
                return;
              let t;
              i
                ? (t = i.hasClass(e.params.navigation.hiddenClass))
                : a && (t = a.hasClass(e.params.navigation.hiddenClass)),
                n(!0 === t ? "navigationShow" : "navigationHide"),
                i && i.toggleClass(e.params.navigation.hiddenClass),
                a && a.toggleClass(e.params.navigation.hiddenClass);
            }
          }),
          Object.assign(e.navigation, { update: r, init: c, destroy: u });
      }
      function St(t) {
        return (
          void 0 === t && (t = ""),
          `.${t
            .trim()
            .replace(/([\.:!\/])/g, "\\$1")
            .replace(/ /g, ".")}`
        );
      }
      function Ct(t) {
        let { swiper: e, extendParams: s, on: i, emit: n } = t;
        const a = "swiper-pagination";
        let l;
        s({
          pagination: {
            el: null,
            bulletElement: "span",
            clickable: !1,
            hideOnClick: !1,
            renderBullet: null,
            renderProgressbar: null,
            renderFraction: null,
            renderCustom: null,
            progressbarOpposite: !1,
            type: "bullets",
            dynamicBullets: !1,
            dynamicMainBullets: 1,
            formatFractionCurrent: (t) => t,
            formatFractionTotal: (t) => t,
            bulletClass: `${a}-bullet`,
            bulletActiveClass: `${a}-bullet-active`,
            modifierClass: `${a}-`,
            currentClass: `${a}-current`,
            totalClass: `${a}-total`,
            hiddenClass: `${a}-hidden`,
            progressbarFillClass: `${a}-progressbar-fill`,
            progressbarOppositeClass: `${a}-progressbar-opposite`,
            clickableClass: `${a}-clickable`,
            lockClass: `${a}-lock`,
            horizontalClass: `${a}-horizontal`,
            verticalClass: `${a}-vertical`,
          },
        }),
          (e.pagination = { el: null, $el: null, bullets: [] });
        let r = 0;
        function o() {
          return (
            !e.params.pagination.el ||
            !e.pagination.el ||
            !e.pagination.$el ||
            0 === e.pagination.$el.length
          );
        }
        function d(t, s) {
          const { bulletActiveClass: i } = e.params.pagination;
          t[s]().addClass(`${i}-${s}`)[s]().addClass(`${i}-${s}-${s}`);
        }
        function c() {
          const t = e.rtl,
            s = e.params.pagination;
          if (o()) return;
          const i =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            a = e.pagination.$el;
          let c;
          const u = e.params.loop
            ? Math.ceil((i - 2 * e.loopedSlides) / e.params.slidesPerGroup)
            : e.snapGrid.length;
          if (
            (e.params.loop
              ? ((c = Math.ceil(
                  (e.activeIndex - e.loopedSlides) / e.params.slidesPerGroup
                )),
                c > i - 1 - 2 * e.loopedSlides && (c -= i - 2 * e.loopedSlides),
                c > u - 1 && (c -= u),
                c < 0 && "bullets" !== e.params.paginationType && (c = u + c))
              : (c = void 0 !== e.snapIndex ? e.snapIndex : e.activeIndex || 0),
            "bullets" === s.type &&
              e.pagination.bullets &&
              e.pagination.bullets.length > 0)
          ) {
            const i = e.pagination.bullets;
            let n, o, u;
            if (
              (s.dynamicBullets &&
                ((l = i
                  .eq(0)
                  [e.isHorizontal() ? "outerWidth" : "outerHeight"](!0)),
                a.css(
                  e.isHorizontal() ? "width" : "height",
                  l * (s.dynamicMainBullets + 4) + "px"
                ),
                s.dynamicMainBullets > 1 &&
                  void 0 !== e.previousIndex &&
                  ((r += c - (e.previousIndex - e.loopedSlides || 0)),
                  r > s.dynamicMainBullets - 1
                    ? (r = s.dynamicMainBullets - 1)
                    : r < 0 && (r = 0)),
                (n = Math.max(c - r, 0)),
                (o = n + (Math.min(i.length, s.dynamicMainBullets) - 1)),
                (u = (o + n) / 2)),
              i.removeClass(
                ["", "-next", "-next-next", "-prev", "-prev-prev", "-main"]
                  .map((t) => `${s.bulletActiveClass}${t}`)
                  .join(" ")
              ),
              a.length > 1)
            )
              i.each((t) => {
                const e = M(t),
                  i = e.index();
                i === c && e.addClass(s.bulletActiveClass),
                  s.dynamicBullets &&
                    (i >= n &&
                      i <= o &&
                      e.addClass(`${s.bulletActiveClass}-main`),
                    i === n && d(e, "prev"),
                    i === o && d(e, "next"));
              });
            else {
              const t = i.eq(c),
                a = t.index();
              if ((t.addClass(s.bulletActiveClass), s.dynamicBullets)) {
                const t = i.eq(n),
                  l = i.eq(o);
                for (let t = n; t <= o; t += 1)
                  i.eq(t).addClass(`${s.bulletActiveClass}-main`);
                if (e.params.loop)
                  if (a >= i.length) {
                    for (let t = s.dynamicMainBullets; t >= 0; t -= 1)
                      i.eq(i.length - t).addClass(
                        `${s.bulletActiveClass}-main`
                      );
                    i.eq(i.length - s.dynamicMainBullets - 1).addClass(
                      `${s.bulletActiveClass}-prev`
                    );
                  } else d(t, "prev"), d(l, "next");
                else d(t, "prev"), d(l, "next");
              }
            }
            if (s.dynamicBullets) {
              const n = Math.min(i.length, s.dynamicMainBullets + 4),
                a = (l * n - l) / 2 - u * l,
                r = t ? "right" : "left";
              i.css(e.isHorizontal() ? r : "top", `${a}px`);
            }
          }
          if (
            ("fraction" === s.type &&
              (a.find(St(s.currentClass)).text(s.formatFractionCurrent(c + 1)),
              a.find(St(s.totalClass)).text(s.formatFractionTotal(u))),
            "progressbar" === s.type)
          ) {
            let t;
            t = s.progressbarOpposite
              ? e.isHorizontal()
                ? "vertical"
                : "horizontal"
              : e.isHorizontal()
              ? "horizontal"
              : "vertical";
            const i = (c + 1) / u;
            let n = 1,
              l = 1;
            "horizontal" === t ? (n = i) : (l = i),
              a
                .find(St(s.progressbarFillClass))
                .transform(`translate3d(0,0,0) scaleX(${n}) scaleY(${l})`)
                .transition(e.params.speed);
          }
          "custom" === s.type && s.renderCustom
            ? (a.html(s.renderCustom(e, c + 1, u)), n("paginationRender", a[0]))
            : n("paginationUpdate", a[0]),
            e.params.watchOverflow &&
              e.enabled &&
              a[e.isLocked ? "addClass" : "removeClass"](s.lockClass);
        }
        function u() {
          const t = e.params.pagination;
          if (o()) return;
          const s =
              e.virtual && e.params.virtual.enabled
                ? e.virtual.slides.length
                : e.slides.length,
            i = e.pagination.$el;
          let a = "";
          if ("bullets" === t.type) {
            let n = e.params.loop
              ? Math.ceil((s - 2 * e.loopedSlides) / e.params.slidesPerGroup)
              : e.snapGrid.length;
            e.params.freeMode &&
              e.params.freeMode.enabled &&
              !e.params.loop &&
              n > s &&
              (n = s);
            for (let s = 0; s < n; s += 1)
              t.renderBullet
                ? (a += t.renderBullet.call(e, s, t.bulletClass))
                : (a += `<${t.bulletElement} class="${t.bulletClass}"></${t.bulletElement}>`);
            i.html(a), (e.pagination.bullets = i.find(St(t.bulletClass)));
          }
          "fraction" === t.type &&
            ((a = t.renderFraction
              ? t.renderFraction.call(e, t.currentClass, t.totalClass)
              : `<span class="${t.currentClass}"></span> / <span class="${t.totalClass}"></span>`),
            i.html(a)),
            "progressbar" === t.type &&
              ((a = t.renderProgressbar
                ? t.renderProgressbar.call(e, t.progressbarFillClass)
                : `<span class="${t.progressbarFillClass}"></span>`),
              i.html(a)),
            "custom" !== t.type && n("paginationRender", e.pagination.$el[0]);
        }
        function h() {
          e.params.pagination = yt(
            e,
            e.originalParams.pagination,
            e.params.pagination,
            { el: "swiper-pagination" }
          );
          const t = e.params.pagination;
          if (!t.el) return;
          let s = M(t.el);
          0 !== s.length &&
            (e.params.uniqueNavElements &&
              "string" == typeof t.el &&
              s.length > 1 &&
              ((s = e.$el.find(t.el)),
              s.length > 1 &&
                (s = s.filter((t) => M(t).parents(".swiper")[0] === e.el))),
            "bullets" === t.type && t.clickable && s.addClass(t.clickableClass),
            s.addClass(t.modifierClass + t.type),
            s.addClass(t.modifierClass + e.params.direction),
            "bullets" === t.type &&
              t.dynamicBullets &&
              (s.addClass(`${t.modifierClass}${t.type}-dynamic`),
              (r = 0),
              t.dynamicMainBullets < 1 && (t.dynamicMainBullets = 1)),
            "progressbar" === t.type &&
              t.progressbarOpposite &&
              s.addClass(t.progressbarOppositeClass),
            t.clickable &&
              s.on("click", St(t.bulletClass), function (t) {
                t.preventDefault();
                let s = M(this).index() * e.params.slidesPerGroup;
                e.params.loop && (s += e.loopedSlides), e.slideTo(s);
              }),
            Object.assign(e.pagination, { $el: s, el: s[0] }),
            e.enabled || s.addClass(t.lockClass));
        }
        function p() {
          const t = e.params.pagination;
          if (o()) return;
          const s = e.pagination.$el;
          s.removeClass(t.hiddenClass),
            s.removeClass(t.modifierClass + t.type),
            s.removeClass(t.modifierClass + e.params.direction),
            e.pagination.bullets &&
              e.pagination.bullets.removeClass &&
              e.pagination.bullets.removeClass(t.bulletActiveClass),
            t.clickable && s.off("click", St(t.bulletClass));
        }
        i("init", () => {
          h(), u(), c();
        }),
          i("activeIndexChange", () => {
            (e.params.loop || void 0 === e.snapIndex) && c();
          }),
          i("snapIndexChange", () => {
            e.params.loop || c();
          }),
          i("slidesLengthChange", () => {
            e.params.loop && (u(), c());
          }),
          i("snapGridLengthChange", () => {
            e.params.loop || (u(), c());
          }),
          i("destroy", () => {
            p();
          }),
          i("enable disable", () => {
            const { $el: t } = e.pagination;
            t &&
              t[e.enabled ? "removeClass" : "addClass"](
                e.params.pagination.lockClass
              );
          }),
          i("lock unlock", () => {
            c();
          }),
          i("click", (t, s) => {
            const i = s.target,
              { $el: a } = e.pagination;
            if (
              e.params.pagination.el &&
              e.params.pagination.hideOnClick &&
              a.length > 0 &&
              !M(i).hasClass(e.params.pagination.bulletClass)
            ) {
              if (
                e.navigation &&
                ((e.navigation.nextEl && i === e.navigation.nextEl) ||
                  (e.navigation.prevEl && i === e.navigation.prevEl))
              )
                return;
              const t = a.hasClass(e.params.pagination.hiddenClass);
              n(!0 === t ? "paginationShow" : "paginationHide"),
                a.toggleClass(e.params.pagination.hiddenClass);
            }
          }),
          Object.assign(e.pagination, {
            render: u,
            update: c,
            init: h,
            destroy: p,
          });
      }
      function Tt(t) {
        let { swiper: e, extendParams: s, on: i } = t;
        s({
          thumbs: {
            swiper: null,
            multipleActiveThumbs: !0,
            autoScrollOffset: 0,
            slideThumbActiveClass: "swiper-slide-thumb-active",
            thumbsContainerClass: "swiper-thumbs",
          },
        });
        let n = !1,
          a = !1;
        function l() {
          const t = e.thumbs.swiper;
          if (!t) return;
          const s = t.clickedIndex,
            i = t.clickedSlide;
          if (i && M(i).hasClass(e.params.thumbs.slideThumbActiveClass)) return;
          if (null == s) return;
          let n;
          if (
            ((n = t.params.loop
              ? parseInt(M(t.clickedSlide).attr("data-swiper-slide-index"), 10)
              : s),
            e.params.loop)
          ) {
            let t = e.activeIndex;
            e.slides.eq(t).hasClass(e.params.slideDuplicateClass) &&
              (e.loopFix(),
              (e._clientLeft = e.$wrapperEl[0].clientLeft),
              (t = e.activeIndex));
            const s = e.slides
                .eq(t)
                .prevAll(`[data-swiper-slide-index="${n}"]`)
                .eq(0)
                .index(),
              i = e.slides
                .eq(t)
                .nextAll(`[data-swiper-slide-index="${n}"]`)
                .eq(0)
                .index();
            n = void 0 === s ? i : void 0 === i ? s : i - t < t - s ? i : s;
          }
          e.slideTo(n);
        }
        function r() {
          const { thumbs: t } = e.params;
          if (n) return !1;
          n = !0;
          const s = e.constructor;
          if (t.swiper instanceof s)
            (e.thumbs.swiper = t.swiper),
              Object.assign(e.thumbs.swiper.originalParams, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              }),
              Object.assign(e.thumbs.swiper.params, {
                watchSlidesProgress: !0,
                slideToClickedSlide: !1,
              });
          else if (B(t.swiper)) {
            const i = Object.assign({}, t.swiper);
            Object.assign(i, {
              watchSlidesProgress: !0,
              slideToClickedSlide: !1,
            }),
              (e.thumbs.swiper = new s(i)),
              (a = !0);
          }
          return (
            e.thumbs.swiper.$el.addClass(e.params.thumbs.thumbsContainerClass),
            e.thumbs.swiper.on("tap", l),
            !0
          );
        }
        function o(t) {
          const s = e.thumbs.swiper;
          if (!s) return;
          const i =
              "auto" === s.params.slidesPerView
                ? s.slidesPerViewDynamic()
                : s.params.slidesPerView,
            n = e.params.thumbs.autoScrollOffset,
            a = n && !s.params.loop;
          if (e.realIndex !== s.realIndex || a) {
            let l,
              r,
              o = s.activeIndex;
            if (s.params.loop) {
              s.slides.eq(o).hasClass(s.params.slideDuplicateClass) &&
                (s.loopFix(),
                (s._clientLeft = s.$wrapperEl[0].clientLeft),
                (o = s.activeIndex));
              const t = s.slides
                  .eq(o)
                  .prevAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                  .eq(0)
                  .index(),
                i = s.slides
                  .eq(o)
                  .nextAll(`[data-swiper-slide-index="${e.realIndex}"]`)
                  .eq(0)
                  .index();
              (l =
                void 0 === t
                  ? i
                  : void 0 === i
                  ? t
                  : i - o == o - t
                  ? s.params.slidesPerGroup > 1
                    ? i
                    : o
                  : i - o < o - t
                  ? i
                  : t),
                (r = e.activeIndex > e.previousIndex ? "next" : "prev");
            } else
              (l = e.realIndex), (r = l > e.previousIndex ? "next" : "prev");
            a && (l += "next" === r ? n : -1 * n),
              s.visibleSlidesIndexes &&
                s.visibleSlidesIndexes.indexOf(l) < 0 &&
                (s.params.centeredSlides
                  ? (l =
                      l > o
                        ? l - Math.floor(i / 2) + 1
                        : l + Math.floor(i / 2) - 1)
                  : l > o && s.params.slidesPerGroup,
                s.slideTo(l, t ? 0 : void 0));
          }
          let l = 1;
          const r = e.params.thumbs.slideThumbActiveClass;
          if (
            (e.params.slidesPerView > 1 &&
              !e.params.centeredSlides &&
              (l = e.params.slidesPerView),
            e.params.thumbs.multipleActiveThumbs || (l = 1),
            (l = Math.floor(l)),
            s.slides.removeClass(r),
            s.params.loop || (s.params.virtual && s.params.virtual.enabled))
          )
            for (let t = 0; t < l; t += 1)
              s.$wrapperEl
                .children(`[data-swiper-slide-index="${e.realIndex + t}"]`)
                .addClass(r);
          else
            for (let t = 0; t < l; t += 1)
              s.slides.eq(e.realIndex + t).addClass(r);
        }
        (e.thumbs = { swiper: null }),
          i("beforeInit", () => {
            const { thumbs: t } = e.params;
            t && t.swiper && (r(), o(!0));
          }),
          i("slideChange update resize observerUpdate", () => {
            e.thumbs.swiper && o();
          }),
          i("setTransition", (t, s) => {
            const i = e.thumbs.swiper;
            i && i.setTransition(s);
          }),
          i("beforeDestroy", () => {
            const t = e.thumbs.swiper;
            t && a && t && t.destroy();
          }),
          Object.assign(e.thumbs, { init: r, update: o });
      }
      function xt() {
        let t = document.querySelectorAll(
          '[class*="__swiper"]:not(.swiper-wrapper)'
        );
        t &&
          t.forEach((t) => {
            t.parentElement.classList.add("swiper"),
              t.classList.add("swiper-wrapper");
            for (const e of t.children) e.classList.add("swiper-slide");
          });
      }
      function Et() {
        xt();
        new bt(".reviews-slider", {
          modules: [wt, Ct],
          observer: !0,
          observeParents: !0,
          slidesPerView: 1,
          spaceBetween: 30,
          autoHeight: !0,
          speed: 500,
          pagination: { el: ".reviews__pagination", clickable: !0 },
          navigation: {
            nextEl: ".reviews__button-next",
            prevEl: ".reviews__button-prev",
          },
          on: {},
        });
        let t = new bt(".product-thumb", { slidesPerView: 3, on: {} });
        new bt(".product-slider", {
          modules: [wt, Tt],
          thumbs: { swiper: t },
          slidesPerView: 1,
          spaceBetween: 30,
          navigation: {
            nextEl: ".product-slider__btn-next",
            prevEl: ".product-slider__btn-prev",
          },
          on: {},
        }),
          new bt(".product-recommend", {
            modules: [wt],
            observer: !0,
            observeParents: !0,
            slidesPerView: 4,
            spaceBetween: 30,
            autoHeight: !0,
            speed: 500,
            loop: !0,
            navigation: {
              nextEl: ".product-recommend__btn-next",
              prevEl: ".product-recommend__btn-prev",
            },
            breakpoints: {
              320: { slidesPerView: 2, spaceBetween: 0 },
              768: { slidesPerView: 3, spaceBetween: 20 },
              1268: { slidesPerView: 4, spaceBetween: 30 },
            },
            on: {},
          });
      }
      window.addEventListener("load", function (t) {
        Et();
      });
      let _t = !1;
      setTimeout(() => {
        if (_t) {
          let t = new Event("windowScroll");
          window.addEventListener("scroll", function (e) {
            document.dispatchEvent(t);
          });
        }
      }, 0);
      var It = function () {
        return (
          (It =
            Object.assign ||
            function (t) {
              for (var e, s = 1, i = arguments.length; s < i; s++)
                for (var n in (e = arguments[s]))
                  Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
              return t;
            }),
          It.apply(this, arguments)
        );
      };
      var Lt = "lgAfterAppendSlide",
        $t = "lgInit",
        kt = "lgHasVideo",
        At = "lgContainerResize",
        Ot = "lgUpdateSlides",
        Mt = "lgAfterAppendSubHtml",
        Pt = "lgBeforeOpen",
        Dt = "lgAfterOpen",
        zt = "lgSlideItemLoad",
        Bt = "lgBeforeSlide",
        Gt = "lgAfterSlide",
        qt = "lgPosterClick",
        Ht = "lgDragStart",
        Nt = "lgDragMove",
        jt = "lgDragEnd",
        Ft = "lgBeforeNextSlide",
        Wt = "lgBeforePrevSlide",
        Vt = "lgBeforeClose",
        Xt = "lgAfterClose",
        Rt = {
          mode: "lg-slide",
          easing: "ease",
          speed: 400,
          licenseKey: "0000-0000-000-0000",
          height: "100%",
          width: "100%",
          addClass: "",
          startClass: "lg-start-zoom",
          backdropDuration: 300,
          container: "",
          startAnimationDuration: 400,
          zoomFromOrigin: !0,
          hideBarsDelay: 0,
          showBarsAfter: 1e4,
          slideDelay: 0,
          supportLegacyBrowser: !0,
          allowMediaOverlap: !1,
          videoMaxSize: "1280-720",
          loadYouTubePoster: !0,
          defaultCaptionHeight: 0,
          ariaLabelledby: "",
          ariaDescribedby: "",
          closable: !0,
          swipeToClose: !0,
          closeOnTap: !0,
          showCloseIcon: !0,
          showMaximizeIcon: !1,
          loop: !0,
          escKey: !0,
          keyPress: !0,
          controls: !0,
          slideEndAnimation: !0,
          hideControlOnEnd: !1,
          mousewheel: !1,
          getCaptionFromTitleOrAlt: !0,
          appendSubHtmlTo: ".lg-sub-html",
          subHtmlSelectorRelative: !1,
          preload: 2,
          numberOfSlideItemsInDom: 10,
          selector: "",
          selectWithin: "",
          nextHtml: "",
          prevHtml: "",
          index: 0,
          iframeWidth: "100%",
          iframeHeight: "100%",
          iframeMaxWidth: "100%",
          iframeMaxHeight: "100%",
          download: !0,
          counter: !0,
          appendCounterTo: ".lg-toolbar",
          swipeThreshold: 50,
          enableSwipe: !0,
          enableDrag: !0,
          dynamic: !1,
          dynamicEl: [],
          extraProps: [],
          exThumbImage: "",
          isMobile: void 0,
          mobileSettings: { controls: !1, showCloseIcon: !1, download: !1 },
          plugins: [],
          strings: {
            closeGallery: "Close gallery",
            toggleMaximize: "Toggle maximize",
            previousSlide: "Previous slide",
            nextSlide: "Next slide",
            download: "Download",
            playVideo: "Play video",
          },
        };
      var Yt = (function () {
        function t(t) {
          return (
            (this.cssVenderPrefixes = [
              "TransitionDuration",
              "TransitionTimingFunction",
              "Transform",
              "Transition",
            ]),
            (this.selector = this._getSelector(t)),
            (this.firstElement = this._getFirstEl()),
            this
          );
        }
        return (
          (t.generateUUID = function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
              /[xy]/g,
              function (t) {
                var e = (16 * Math.random()) | 0;
                return ("x" == t ? e : (3 & e) | 8).toString(16);
              }
            );
          }),
          (t.prototype._getSelector = function (t, e) {
            return (
              void 0 === e && (e = document),
              "string" != typeof t
                ? t
                : ((e = e || document),
                  "#" === t.substring(0, 1)
                    ? e.querySelector(t)
                    : e.querySelectorAll(t))
            );
          }),
          (t.prototype._each = function (t) {
            return this.selector
              ? (void 0 !== this.selector.length
                  ? [].forEach.call(this.selector, t)
                  : t(this.selector, 0),
                this)
              : this;
          }),
          (t.prototype._setCssVendorPrefix = function (t, e, s) {
            var i = e.replace(/-([a-z])/gi, function (t, e) {
              return e.toUpperCase();
            });
            -1 !== this.cssVenderPrefixes.indexOf(i)
              ? ((t.style[i.charAt(0).toLowerCase() + i.slice(1)] = s),
                (t.style["webkit" + i] = s),
                (t.style["moz" + i] = s),
                (t.style["ms" + i] = s),
                (t.style["o" + i] = s))
              : (t.style[i] = s);
          }),
          (t.prototype._getFirstEl = function () {
            return this.selector && void 0 !== this.selector.length
              ? this.selector[0]
              : this.selector;
          }),
          (t.prototype.isEventMatched = function (t, e) {
            var s = e.split(".");
            return t
              .split(".")
              .filter(function (t) {
                return t;
              })
              .every(function (t) {
                return -1 !== s.indexOf(t);
              });
          }),
          (t.prototype.attr = function (t, e) {
            return void 0 === e
              ? this.firstElement
                ? this.firstElement.getAttribute(t)
                : ""
              : (this._each(function (s) {
                  s.setAttribute(t, e);
                }),
                this);
          }),
          (t.prototype.find = function (t) {
            return Ut(this._getSelector(t, this.selector));
          }),
          (t.prototype.first = function () {
            return this.selector && void 0 !== this.selector.length
              ? Ut(this.selector[0])
              : Ut(this.selector);
          }),
          (t.prototype.eq = function (t) {
            return Ut(this.selector[t]);
          }),
          (t.prototype.parent = function () {
            return Ut(this.selector.parentElement);
          }),
          (t.prototype.get = function () {
            return this._getFirstEl();
          }),
          (t.prototype.removeAttr = function (t) {
            var e = t.split(" ");
            return (
              this._each(function (t) {
                e.forEach(function (e) {
                  return t.removeAttribute(e);
                });
              }),
              this
            );
          }),
          (t.prototype.wrap = function (t) {
            if (!this.firstElement) return this;
            var e = document.createElement("div");
            return (
              (e.className = t),
              this.firstElement.parentNode.insertBefore(e, this.firstElement),
              this.firstElement.parentNode.removeChild(this.firstElement),
              e.appendChild(this.firstElement),
              this
            );
          }),
          (t.prototype.addClass = function (t) {
            return (
              void 0 === t && (t = ""),
              this._each(function (e) {
                t.split(" ").forEach(function (t) {
                  t && e.classList.add(t);
                });
              }),
              this
            );
          }),
          (t.prototype.removeClass = function (t) {
            return (
              this._each(function (e) {
                t.split(" ").forEach(function (t) {
                  t && e.classList.remove(t);
                });
              }),
              this
            );
          }),
          (t.prototype.hasClass = function (t) {
            return (
              !!this.firstElement && this.firstElement.classList.contains(t)
            );
          }),
          (t.prototype.hasAttribute = function (t) {
            return !!this.firstElement && this.firstElement.hasAttribute(t);
          }),
          (t.prototype.toggleClass = function (t) {
            return this.firstElement
              ? (this.hasClass(t) ? this.removeClass(t) : this.addClass(t),
                this)
              : this;
          }),
          (t.prototype.css = function (t, e) {
            var s = this;
            return (
              this._each(function (i) {
                s._setCssVendorPrefix(i, t, e);
              }),
              this
            );
          }),
          (t.prototype.on = function (e, s) {
            var i = this;
            return this.selector
              ? (e.split(" ").forEach(function (e) {
                  Array.isArray(t.eventListeners[e]) ||
                    (t.eventListeners[e] = []),
                    t.eventListeners[e].push(s),
                    i.selector.addEventListener(e.split(".")[0], s);
                }),
                this)
              : this;
          }),
          (t.prototype.once = function (t, e) {
            var s = this;
            return (
              this.on(t, function () {
                s.off(t), e(t);
              }),
              this
            );
          }),
          (t.prototype.off = function (e) {
            var s = this;
            return this.selector
              ? (Object.keys(t.eventListeners).forEach(function (i) {
                  s.isEventMatched(e, i) &&
                    (t.eventListeners[i].forEach(function (t) {
                      s.selector.removeEventListener(i.split(".")[0], t);
                    }),
                    (t.eventListeners[i] = []));
                }),
                this)
              : this;
          }),
          (t.prototype.trigger = function (t, e) {
            if (!this.firstElement) return this;
            var s = new CustomEvent(t.split(".")[0], { detail: e || null });
            return this.firstElement.dispatchEvent(s), this;
          }),
          (t.prototype.load = function (t) {
            var e = this;
            return (
              fetch(t)
                .then(function (t) {
                  return t.text();
                })
                .then(function (t) {
                  e.selector.innerHTML = t;
                }),
              this
            );
          }),
          (t.prototype.html = function (t) {
            return void 0 === t
              ? this.firstElement
                ? this.firstElement.innerHTML
                : ""
              : (this._each(function (e) {
                  e.innerHTML = t;
                }),
                this);
          }),
          (t.prototype.append = function (t) {
            return (
              this._each(function (e) {
                "string" == typeof t
                  ? e.insertAdjacentHTML("beforeend", t)
                  : e.appendChild(t);
              }),
              this
            );
          }),
          (t.prototype.prepend = function (t) {
            return (
              this._each(function (e) {
                e.insertAdjacentHTML("afterbegin", t);
              }),
              this
            );
          }),
          (t.prototype.remove = function () {
            return (
              this._each(function (t) {
                t.parentNode.removeChild(t);
              }),
              this
            );
          }),
          (t.prototype.empty = function () {
            return (
              this._each(function (t) {
                t.innerHTML = "";
              }),
              this
            );
          }),
          (t.prototype.scrollTop = function (t) {
            return void 0 !== t
              ? ((document.body.scrollTop = t),
                (document.documentElement.scrollTop = t),
                this)
              : window.pageYOffset ||
                  document.documentElement.scrollTop ||
                  document.body.scrollTop ||
                  0;
          }),
          (t.prototype.scrollLeft = function (t) {
            return void 0 !== t
              ? ((document.body.scrollLeft = t),
                (document.documentElement.scrollLeft = t),
                this)
              : window.pageXOffset ||
                  document.documentElement.scrollLeft ||
                  document.body.scrollLeft ||
                  0;
          }),
          (t.prototype.offset = function () {
            if (!this.firstElement) return { left: 0, top: 0 };
            var t = this.firstElement.getBoundingClientRect(),
              e = Ut("body").style().marginLeft;
            return {
              left: t.left - parseFloat(e) + this.scrollLeft(),
              top: t.top + this.scrollTop(),
            };
          }),
          (t.prototype.style = function () {
            return this.firstElement
              ? this.firstElement.currentStyle ||
                  window.getComputedStyle(this.firstElement)
              : {};
          }),
          (t.prototype.width = function () {
            var t = this.style();
            return (
              this.firstElement.clientWidth -
              parseFloat(t.paddingLeft) -
              parseFloat(t.paddingRight)
            );
          }),
          (t.prototype.height = function () {
            var t = this.style();
            return (
              this.firstElement.clientHeight -
              parseFloat(t.paddingTop) -
              parseFloat(t.paddingBottom)
            );
          }),
          (t.eventListeners = {}),
          t
        );
      })();
      function Ut(t) {
        return (
          (function () {
            if ("function" == typeof window.CustomEvent) return !1;
            window.CustomEvent = function (t, e) {
              e = e || { bubbles: !1, cancelable: !1, detail: null };
              var s = document.createEvent("CustomEvent");
              return s.initCustomEvent(t, e.bubbles, e.cancelable, e.detail), s;
            };
          })(),
          Element.prototype.matches ||
            (Element.prototype.matches =
              Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector),
          new Yt(t)
        );
      }
      var Kt = [
        "src",
        "sources",
        "subHtml",
        "subHtmlUrl",
        "html",
        "video",
        "poster",
        "slideName",
        "responsive",
        "srcset",
        "sizes",
        "iframe",
        "downloadUrl",
        "download",
        "width",
        "facebookShareUrl",
        "tweetText",
        "iframeTitle",
        "twitterShareUrl",
        "pinterestShareUrl",
        "pinterestText",
        "fbHtml",
        "disqusIdentifier",
        "disqusUrl",
      ];
      function Qt(t) {
        return "href" === t
          ? "src"
          : (t = (t =
              (t = t.replace("data-", "")).charAt(0).toLowerCase() +
              t.slice(1)).replace(/-([a-z])/g, function (t) {
              return t[1].toUpperCase();
            }));
      }
      var Zt = function (t, e, s, i) {
          void 0 === s && (s = 0);
          var n = Ut(t).attr("data-lg-size") || i;
          if (n) {
            var a = n.split(",");
            if (a[1])
              for (var l = window.innerWidth, r = 0; r < a.length; r++) {
                var o = a[r];
                if (parseInt(o.split("-")[2], 10) > l) {
                  n = o;
                  break;
                }
                r === a.length - 1 && (n = o);
              }
            var d = n.split("-"),
              c = parseInt(d[0], 10),
              u = parseInt(d[1], 10),
              h = e.width(),
              p = e.height() - s,
              m = Math.min(h, c),
              g = Math.min(p, u),
              f = Math.min(m / c, g / u);
            return { width: c * f, height: u * f };
          }
        },
        Jt = function (t, e, s, i, n) {
          if (n) {
            var a = Ut(t).find("img").first();
            if (a.get()) {
              var l = e.get().getBoundingClientRect(),
                r = l.width,
                o = e.height() - (s + i),
                d = a.width(),
                c = a.height(),
                u = a.style(),
                h =
                  (r - d) / 2 -
                  a.offset().left +
                  (parseFloat(u.paddingLeft) || 0) +
                  (parseFloat(u.borderLeft) || 0) +
                  Ut(window).scrollLeft() +
                  l.left,
                p =
                  (o - c) / 2 -
                  a.offset().top +
                  (parseFloat(u.paddingTop) || 0) +
                  (parseFloat(u.borderTop) || 0) +
                  Ut(window).scrollTop() +
                  s;
              return (
                "translate3d(" +
                (h *= -1) +
                "px, " +
                (p *= -1) +
                "px, 0) scale3d(" +
                d / n.width +
                ", " +
                c / n.height +
                ", 1)"
              );
            }
          }
        },
        te = function (t, e, s, i, n, a) {
          return (
            '<div class="lg-video-cont lg-has-iframe" style="width:' +
            t +
            "; max-width:" +
            s +
            "; height: " +
            e +
            "; max-height:" +
            i +
            '">\n                    <iframe class="lg-object" frameborder="0" ' +
            (a ? 'title="' + a + '"' : "") +
            ' src="' +
            n +
            '"  allowfullscreen="true"></iframe>\n                </div>'
          );
        },
        ee = function (t, e, s, i, n, a) {
          var l =
              "<img " +
              s +
              " " +
              (i ? 'srcset="' + i + '"' : "") +
              "  " +
              (n ? 'sizes="' + n + '"' : "") +
              ' class="lg-object lg-image" data-index="' +
              t +
              '" src="' +
              e +
              '" />',
            r = "";
          a &&
            (r = ("string" == typeof a ? JSON.parse(a) : a).map(function (t) {
              var e = "";
              return (
                Object.keys(t).forEach(function (s) {
                  e += " " + s + '="' + t[s] + '"';
                }),
                "<source " + e + "></source>"
              );
            }));
          return "" + r + l;
        },
        se = function (t) {
          for (var e = [], s = [], i = "", n = 0; n < t.length; n++) {
            var a = t[n].split(" ");
            "" === a[0] && a.splice(0, 1), s.push(a[0]), e.push(a[1]);
          }
          for (var l = window.innerWidth, r = 0; r < e.length; r++)
            if (parseInt(e[r], 10) > l) {
              i = s[r];
              break;
            }
          return i;
        },
        ie = function (t) {
          return !!t && !!t.complete && 0 !== t.naturalWidth;
        },
        ne = function (t, e, s, i, n) {
          return (
            '<div class="lg-video-cont ' +
            (n && n.youtube
              ? "lg-has-youtube"
              : n && n.vimeo
              ? "lg-has-vimeo"
              : "lg-has-html5") +
            '" style="' +
            s +
            '">\n                <div class="lg-video-play-button">\n                <svg\n                    viewBox="0 0 20 20"\n                    preserveAspectRatio="xMidYMid"\n                    focusable="false"\n                    aria-labelledby="' +
            i +
            '"\n                    role="img"\n                    class="lg-video-play-icon"\n                >\n                    <title>' +
            i +
            '</title>\n                    <polygon class="lg-video-play-icon-inner" points="1,0 20,10 1,20"></polygon>\n                </svg>\n                <svg class="lg-video-play-icon-bg" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle></svg>\n                <svg class="lg-video-play-icon-circle" viewBox="0 0 50 50" focusable="false">\n                    <circle cx="50%" cy="50%" r="20"></circle>\n                </svg>\n            </div>\n            ' +
            (e || "") +
            '\n            <img class="lg-object lg-video-poster" src="' +
            t +
            '" />\n        </div>'
          );
        },
        ae = function (t, e, s, i) {
          var n = [],
            a = (function () {
              for (var t = 0, e = 0, s = arguments.length; e < s; e++)
                t += arguments[e].length;
              var i = Array(t),
                n = 0;
              for (e = 0; e < s; e++)
                for (var a = arguments[e], l = 0, r = a.length; l < r; l++, n++)
                  i[n] = a[l];
              return i;
            })(Kt, e);
          return (
            [].forEach.call(t, function (t) {
              for (var e = {}, l = 0; l < t.attributes.length; l++) {
                var r = t.attributes[l];
                if (r.specified) {
                  var o = Qt(r.name),
                    d = "";
                  a.indexOf(o) > -1 && (d = o), d && (e[d] = r.value);
                }
              }
              var c = Ut(t),
                u = c.find("img").first().attr("alt"),
                h = c.attr("title"),
                p = i ? c.attr(i) : c.find("img").first().attr("src");
              (e.thumb = p),
                s && !e.subHtml && (e.subHtml = h || u || ""),
                (e.alt = u || h || ""),
                n.push(e);
            }),
            n
          );
        },
        le = function () {
          return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        },
        re = function (t, e, s) {
          if (!t)
            return e
              ? { html5: !0 }
              : void console.error(
                  "lightGallery :- data-src is not provided on slide item " +
                    (s + 1) +
                    ". Please make sure the selector property is properly configured. More info - https://www.lightgalleryjs.com/demos/html-markup/"
                );
          var i = t.match(
              /\/\/(?:www\.)?youtu(?:\.be|be\.com|be-nocookie\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)([\&|?][\S]*)*/i
            ),
            n = t.match(
              /\/\/(?:www\.)?(?:player\.)?vimeo.com\/(?:video\/)?([0-9a-z\-_]+)(.*)?/i
            ),
            a = t.match(
              /https?:\/\/(.+)?(wistia\.com|wi\.st)\/(medias|embed)\/([0-9a-z\-_]+)(.*)/
            );
          return i
            ? { youtube: i }
            : n
            ? { vimeo: n }
            : a
            ? { wistia: a }
            : void 0;
        },
        oe = 0,
        de = (function () {
          function t(t, e) {
            if (
              ((this.lgOpened = !1),
              (this.index = 0),
              (this.plugins = []),
              (this.lGalleryOn = !1),
              (this.lgBusy = !1),
              (this.currentItemsInDom = []),
              (this.prevScrollTop = 0),
              (this.isDummyImageRemoved = !1),
              (this.dragOrSwipeEnabled = !1),
              (this.mediaContainerPosition = { top: 0, bottom: 0 }),
              !t)
            )
              return this;
            if (
              (oe++,
              (this.lgId = oe),
              (this.el = t),
              (this.LGel = Ut(t)),
              this.generateSettings(e),
              this.buildModules(),
              this.settings.dynamic &&
                void 0 !== this.settings.dynamicEl &&
                !Array.isArray(this.settings.dynamicEl))
            )
              throw "When using dynamic mode, you must also define dynamicEl as an Array.";
            return (
              (this.galleryItems = this.getItems()),
              this.normalizeSettings(),
              this.init(),
              this.validateLicense(),
              this
            );
          }
          return (
            (t.prototype.generateSettings = function (t) {
              if (
                ((this.settings = It(It({}, Rt), t)),
                this.settings.isMobile &&
                "function" == typeof this.settings.isMobile
                  ? this.settings.isMobile()
                  : le())
              ) {
                var e = It(
                  It({}, this.settings.mobileSettings),
                  this.settings.mobileSettings
                );
                this.settings = It(It({}, this.settings), e);
              }
            }),
            (t.prototype.normalizeSettings = function () {
              this.settings.slideEndAnimation &&
                (this.settings.hideControlOnEnd = !1),
                this.settings.closable || (this.settings.swipeToClose = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                this.settings.dynamic && (this.zoomFromOrigin = !1),
                this.settings.container ||
                  (this.settings.container = document.body),
                (this.settings.preload = Math.min(
                  this.settings.preload,
                  this.galleryItems.length
                ));
            }),
            (t.prototype.init = function () {
              var t = this;
              this.addSlideVideoInfo(this.galleryItems),
                this.buildStructure(),
                this.LGel.trigger($t, { instance: this }),
                this.settings.keyPress && this.keyPress(),
                setTimeout(function () {
                  t.enableDrag(), t.enableSwipe(), t.triggerPosterClick();
                }, 50),
                this.arrow(),
                this.settings.mousewheel && this.mousewheel(),
                this.settings.dynamic || this.openGalleryOnItemClick();
            }),
            (t.prototype.openGalleryOnItemClick = function () {
              for (
                var t = this,
                  e = function (e) {
                    var i = s.items[e],
                      n = Ut(i),
                      a = Yt.generateUUID();
                    n.attr("data-lg-id", a).on(
                      "click.lgcustom-item-" + a,
                      function (s) {
                        s.preventDefault();
                        var n = t.settings.index || e;
                        t.openGallery(n, i);
                      }
                    );
                  },
                  s = this,
                  i = 0;
                i < this.items.length;
                i++
              )
                e(i);
            }),
            (t.prototype.buildModules = function () {
              var t = this;
              this.settings.plugins.forEach(function (e) {
                t.plugins.push(new e(t, Ut));
              });
            }),
            (t.prototype.validateLicense = function () {
              this.settings.licenseKey
                ? "0000-0000-000-0000" === this.settings.licenseKey &&
                  console.warn(
                    "lightGallery: " +
                      this.settings.licenseKey +
                      " license key is not valid for production use"
                  )
                : console.error("Please provide a valid license key");
            }),
            (t.prototype.getSlideItem = function (t) {
              return Ut(this.getSlideItemId(t));
            }),
            (t.prototype.getSlideItemId = function (t) {
              return "#lg-item-" + this.lgId + "-" + t;
            }),
            (t.prototype.getIdName = function (t) {
              return t + "-" + this.lgId;
            }),
            (t.prototype.getElementById = function (t) {
              return Ut("#" + this.getIdName(t));
            }),
            (t.prototype.manageSingleSlideClassName = function () {
              this.galleryItems.length < 2
                ? this.outer.addClass("lg-single-item")
                : this.outer.removeClass("lg-single-item");
            }),
            (t.prototype.buildStructure = function () {
              var t = this;
              if (!(this.$container && this.$container.get())) {
                var e = "",
                  s = "";
                this.settings.controls &&
                  (e =
                    '<button type="button" id="' +
                    this.getIdName("lg-prev") +
                    '" aria-label="' +
                    this.settings.strings.previousSlide +
                    '" class="lg-prev lg-icon"> ' +
                    this.settings.prevHtml +
                    ' </button>\n                <button type="button" id="' +
                    this.getIdName("lg-next") +
                    '" aria-label="' +
                    this.settings.strings.nextSlide +
                    '" class="lg-next lg-icon"> ' +
                    this.settings.nextHtml +
                    " </button>"),
                  ".lg-item" !== this.settings.appendSubHtmlTo &&
                    (s =
                      '<div class="lg-sub-html" role="status" aria-live="polite"></div>');
                var i = "";
                this.settings.allowMediaOverlap && (i += "lg-media-overlap ");
                var n = this.settings.ariaLabelledby
                    ? 'aria-labelledby="' + this.settings.ariaLabelledby + '"'
                    : "",
                  a = this.settings.ariaDescribedby
                    ? 'aria-describedby="' + this.settings.ariaDescribedby + '"'
                    : "",
                  l =
                    "lg-container " +
                    this.settings.addClass +
                    " " +
                    (document.body !== this.settings.container
                      ? "lg-inline"
                      : ""),
                  r =
                    this.settings.closable && this.settings.showCloseIcon
                      ? '<button type="button" aria-label="' +
                        this.settings.strings.closeGallery +
                        '" id="' +
                        this.getIdName("lg-close") +
                        '" class="lg-close lg-icon"></button>'
                      : "",
                  o = this.settings.showMaximizeIcon
                    ? '<button type="button" aria-label="' +
                      this.settings.strings.toggleMaximize +
                      '" id="' +
                      this.getIdName("lg-maximize") +
                      '" class="lg-maximize lg-icon"></button>'
                    : "",
                  d =
                    '\n        <div class="' +
                    l +
                    '" id="' +
                    this.getIdName("lg-container") +
                    '" tabindex="-1" aria-modal="true" ' +
                    n +
                    " " +
                    a +
                    ' role="dialog"\n        >\n            <div id="' +
                    this.getIdName("lg-backdrop") +
                    '" class="lg-backdrop"></div>\n\n            <div id="' +
                    this.getIdName("lg-outer") +
                    '" class="lg-outer lg-use-css3 lg-css3 lg-hide-items ' +
                    i +
                    ' ">\n\n              <div id="' +
                    this.getIdName("lg-content") +
                    '" class="lg-content">\n                <div id="' +
                    this.getIdName("lg-inner") +
                    '" class="lg-inner">\n                </div>\n                ' +
                    e +
                    '\n              </div>\n                <div id="' +
                    this.getIdName("lg-toolbar") +
                    '" class="lg-toolbar lg-group">\n                    ' +
                    o +
                    "\n                    " +
                    r +
                    "\n                    </div>\n                    " +
                    (".lg-outer" === this.settings.appendSubHtmlTo ? s : "") +
                    '\n                <div id="' +
                    this.getIdName("lg-components") +
                    '" class="lg-components">\n                    ' +
                    (".lg-sub-html" === this.settings.appendSubHtmlTo
                      ? s
                      : "") +
                    "\n                </div>\n            </div>\n        </div>\n        ";
                Ut(this.settings.container).append(d),
                  document.body !== this.settings.container &&
                    Ut(this.settings.container).css("position", "relative"),
                  (this.outer = this.getElementById("lg-outer")),
                  (this.$lgComponents = this.getElementById("lg-components")),
                  (this.$backdrop = this.getElementById("lg-backdrop")),
                  (this.$container = this.getElementById("lg-container")),
                  (this.$inner = this.getElementById("lg-inner")),
                  (this.$content = this.getElementById("lg-content")),
                  (this.$toolbar = this.getElementById("lg-toolbar")),
                  this.$backdrop.css(
                    "transition-duration",
                    this.settings.backdropDuration + "ms"
                  );
                var c = this.settings.mode + " ";
                this.manageSingleSlideClassName(),
                  this.settings.enableDrag && (c += "lg-grab "),
                  this.outer.addClass(c),
                  this.$inner.css(
                    "transition-timing-function",
                    this.settings.easing
                  ),
                  this.$inner.css(
                    "transition-duration",
                    this.settings.speed + "ms"
                  ),
                  this.settings.download &&
                    this.$toolbar.append(
                      '<a id="' +
                        this.getIdName("lg-download") +
                        '" target="_blank" rel="noopener" aria-label="' +
                        this.settings.strings.download +
                        '" download class="lg-download lg-icon"></a>'
                    ),
                  this.counter(),
                  Ut(window).on(
                    "resize.lg.global" +
                      this.lgId +
                      " orientationchange.lg.global" +
                      this.lgId,
                    function () {
                      t.refreshOnResize();
                    }
                  ),
                  this.hideBars(),
                  this.manageCloseGallery(),
                  this.toggleMaximize(),
                  this.initModules();
              }
            }),
            (t.prototype.refreshOnResize = function () {
              if (this.lgOpened) {
                var t = this.galleryItems[this.index].__slideVideoInfo;
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var e = this.mediaContainerPosition,
                  s = e.top,
                  i = e.bottom;
                if (
                  ((this.currentImageSize = Zt(
                    this.items[this.index],
                    this.outer,
                    s + i,
                    t && this.settings.videoMaxSize
                  )),
                  t && this.resizeVideoSlide(this.index, this.currentImageSize),
                  this.zoomFromOrigin && !this.isDummyImageRemoved)
                ) {
                  var n = this.getDummyImgStyles(this.currentImageSize);
                  this.outer
                    .find(".lg-current .lg-dummy-img")
                    .first()
                    .attr("style", n);
                }
                this.LGel.trigger(At);
              }
            }),
            (t.prototype.resizeVideoSlide = function (t, e) {
              var s = this.getVideoContStyle(e);
              this.getSlideItem(t).find(".lg-video-cont").attr("style", s);
            }),
            (t.prototype.updateSlides = function (t, e) {
              if (
                (this.index > t.length - 1 && (this.index = t.length - 1),
                1 === t.length && (this.index = 0),
                t.length)
              ) {
                var s = this.galleryItems[e].src;
                (this.galleryItems = t),
                  this.updateControls(),
                  this.$inner.empty(),
                  (this.currentItemsInDom = []);
                var i = 0;
                this.galleryItems.some(function (t, e) {
                  return t.src === s && ((i = e), !0);
                }),
                  (this.currentItemsInDom = this.organizeSlideItems(i, -1)),
                  this.loadContent(i, !0),
                  this.getSlideItem(i).addClass("lg-current"),
                  (this.index = i),
                  this.updateCurrentCounter(i),
                  this.LGel.trigger(Ot);
              } else this.closeGallery();
            }),
            (t.prototype.getItems = function () {
              if (((this.items = []), this.settings.dynamic))
                return this.settings.dynamicEl || [];
              if ("this" === this.settings.selector) this.items.push(this.el);
              else if (this.settings.selector)
                if ("string" == typeof this.settings.selector)
                  if (this.settings.selectWithin) {
                    var t = Ut(this.settings.selectWithin);
                    this.items = t.find(this.settings.selector).get();
                  } else
                    this.items = this.el.querySelectorAll(
                      this.settings.selector
                    );
                else this.items = this.settings.selector;
              else this.items = this.el.children;
              return ae(
                this.items,
                this.settings.extraProps,
                this.settings.getCaptionFromTitleOrAlt,
                this.settings.exThumbImage
              );
            }),
            (t.prototype.openGallery = function (t, e) {
              var s = this;
              if ((void 0 === t && (t = this.settings.index), !this.lgOpened)) {
                (this.lgOpened = !0),
                  this.outer.get().focus(),
                  this.outer.removeClass("lg-hide-items"),
                  this.$container.addClass("lg-show");
                var i = this.getItemsToBeInsertedToDom(t, t);
                this.currentItemsInDom = i;
                var n = "";
                i.forEach(function (t) {
                  n = n + '<div id="' + t + '" class="lg-item"></div>';
                }),
                  this.$inner.append(n),
                  this.addHtml(t);
                var a = "";
                this.mediaContainerPosition = this.getMediaContainerPosition();
                var l = this.mediaContainerPosition,
                  r = l.top,
                  o = l.bottom;
                this.settings.allowMediaOverlap ||
                  this.setMediaContainerPosition(r, o);
                var d = this.galleryItems[t].__slideVideoInfo;
                this.zoomFromOrigin &&
                  e &&
                  ((this.currentImageSize = Zt(
                    e,
                    this.outer,
                    r + o,
                    d && this.settings.videoMaxSize
                  )),
                  (a = Jt(e, this.outer, r, o, this.currentImageSize))),
                  (this.zoomFromOrigin && a) ||
                    (this.outer.addClass(this.settings.startClass),
                    this.getSlideItem(t).removeClass("lg-complete"));
                var c = this.settings.zoomFromOrigin
                  ? 100
                  : this.settings.backdropDuration;
                setTimeout(function () {
                  s.outer.addClass("lg-components-open");
                }, c),
                  (this.index = t),
                  this.LGel.trigger(Pt),
                  this.getSlideItem(t).addClass("lg-current"),
                  (this.lGalleryOn = !1),
                  (this.prevScrollTop = Ut(window).scrollTop()),
                  setTimeout(function () {
                    if (s.zoomFromOrigin && a) {
                      var e = s.getSlideItem(t);
                      e.css("transform", a),
                        setTimeout(function () {
                          e
                            .addClass("lg-start-progress lg-start-end-progress")
                            .css(
                              "transition-duration",
                              s.settings.startAnimationDuration + "ms"
                            ),
                            s.outer.addClass("lg-zoom-from-image");
                        }),
                        setTimeout(function () {
                          e.css("transform", "translate3d(0, 0, 0)");
                        }, 100);
                    }
                    setTimeout(function () {
                      s.$backdrop.addClass("in"),
                        s.$container.addClass("lg-show-in");
                    }, 10),
                      (s.zoomFromOrigin && a) ||
                        setTimeout(function () {
                          s.outer.addClass("lg-visible");
                        }, s.settings.backdropDuration),
                      s.slide(t, !1, !1, !1),
                      s.LGel.trigger(Dt);
                  }),
                  document.body === this.settings.container &&
                    Ut("html").addClass("lg-on");
              }
            }),
            (t.prototype.getMediaContainerPosition = function () {
              if (this.settings.allowMediaOverlap) return { top: 0, bottom: 0 };
              var t = this.$toolbar.get().clientHeight || 0,
                e = this.outer.find(".lg-components .lg-sub-html").get(),
                s =
                  this.settings.defaultCaptionHeight ||
                  (e && e.clientHeight) ||
                  0,
                i = this.outer.find(".lg-thumb-outer").get();
              return { top: t, bottom: (i ? i.clientHeight : 0) + s };
            }),
            (t.prototype.setMediaContainerPosition = function (t, e) {
              void 0 === t && (t = 0),
                void 0 === e && (e = 0),
                this.$content.css("top", t + "px").css("bottom", e + "px");
            }),
            (t.prototype.hideBars = function () {
              var t = this;
              setTimeout(function () {
                t.outer.removeClass("lg-hide-items"),
                  t.settings.hideBarsDelay > 0 &&
                    (t.outer.on(
                      "mousemove.lg click.lg touchstart.lg",
                      function () {
                        t.outer.removeClass("lg-hide-items"),
                          clearTimeout(t.hideBarTimeout),
                          (t.hideBarTimeout = setTimeout(function () {
                            t.outer.addClass("lg-hide-items");
                          }, t.settings.hideBarsDelay));
                      }
                    ),
                    t.outer.trigger("mousemove.lg"));
              }, this.settings.showBarsAfter);
            }),
            (t.prototype.initPictureFill = function (t) {
              if (this.settings.supportLegacyBrowser)
                try {
                  picturefill({ elements: [t.get()] });
                } catch (t) {
                  console.warn(
                    "lightGallery :- If you want srcset or picture tag to be supported for older browser please include picturefil javascript library in your document."
                  );
                }
            }),
            (t.prototype.counter = function () {
              if (this.settings.counter) {
                var t =
                  '<div class="lg-counter" role="status" aria-live="polite">\n                <span id="' +
                  this.getIdName("lg-counter-current") +
                  '" class="lg-counter-current">' +
                  (this.index + 1) +
                  ' </span> /\n                <span id="' +
                  this.getIdName("lg-counter-all") +
                  '" class="lg-counter-all">' +
                  this.galleryItems.length +
                  " </span></div>";
                this.outer.find(this.settings.appendCounterTo).append(t);
              }
            }),
            (t.prototype.addHtml = function (t) {
              var e, s;
              if (
                (this.galleryItems[t].subHtmlUrl
                  ? (s = this.galleryItems[t].subHtmlUrl)
                  : (e = this.galleryItems[t].subHtml),
                !s)
              )
                if (e) {
                  var i = e.substring(0, 1);
                  ("." !== i && "#" !== i) ||
                    (e =
                      this.settings.subHtmlSelectorRelative &&
                      !this.settings.dynamic
                        ? Ut(this.items).eq(t).find(e).first().html()
                        : Ut(e).first().html());
                } else e = "";
              if (".lg-item" !== this.settings.appendSubHtmlTo)
                s
                  ? this.outer.find(".lg-sub-html").load(s)
                  : this.outer.find(".lg-sub-html").html(e);
              else {
                var n = Ut(this.getSlideItemId(t));
                s
                  ? n.load(s)
                  : n.append('<div class="lg-sub-html">' + e + "</div>");
              }
              null != e &&
                ("" === e
                  ? this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .addClass("lg-empty-html")
                  : this.outer
                      .find(this.settings.appendSubHtmlTo)
                      .removeClass("lg-empty-html")),
                this.LGel.trigger(Mt, { index: t });
            }),
            (t.prototype.preload = function (t) {
              for (
                var e = 1;
                e <= this.settings.preload &&
                !(e >= this.galleryItems.length - t);
                e++
              )
                this.loadContent(t + e, !1);
              for (var s = 1; s <= this.settings.preload && !(t - s < 0); s++)
                this.loadContent(t - s, !1);
            }),
            (t.prototype.getDummyImgStyles = function (t) {
              return t
                ? "width:" +
                    t.width +
                    "px;\n                margin-left: -" +
                    t.width / 2 +
                    "px;\n                margin-top: -" +
                    t.height / 2 +
                    "px;\n                height:" +
                    t.height +
                    "px"
                : "";
            }),
            (t.prototype.getVideoContStyle = function (t) {
              return t
                ? "width:" +
                    t.width +
                    "px;\n                height:" +
                    t.height +
                    "px"
                : "";
            }),
            (t.prototype.getDummyImageContent = function (t, e, s) {
              var i;
              if ((this.settings.dynamic || (i = Ut(this.items).eq(e)), i)) {
                var n = void 0;
                if (
                  !(n = this.settings.exThumbImage
                    ? i.attr(this.settings.exThumbImage)
                    : i.find("img").first().attr("src"))
                )
                  return "";
                var a =
                  "<img " +
                  s +
                  ' style="' +
                  this.getDummyImgStyles(this.currentImageSize) +
                  '" class="lg-dummy-img" src="' +
                  n +
                  '" />';
                return (
                  t.addClass("lg-first-slide"),
                  this.outer.addClass("lg-first-slide-loading"),
                  a
                );
              }
              return "";
            }),
            (t.prototype.setImgMarkup = function (t, e, s) {
              var i = this.galleryItems[s],
                n = i.alt,
                a = i.srcset,
                l = i.sizes,
                r = i.sources,
                o = n ? 'alt="' + n + '"' : "",
                d =
                  '<picture class="lg-img-wrap"> ' +
                  (this.isFirstSlideWithZoomAnimation()
                    ? this.getDummyImageContent(e, s, o)
                    : ee(s, t, o, a, l, r)) +
                  "</picture>";
              e.prepend(d);
            }),
            (t.prototype.onSlideObjectLoad = function (t, e, s, i) {
              var n = t.find(".lg-object").first();
              ie(n.get()) || e
                ? s()
                : (n.on("load.lg error.lg", function () {
                    s && s();
                  }),
                  n.on("error.lg", function () {
                    i && i();
                  }));
            }),
            (t.prototype.onLgObjectLoad = function (t, e, s, i, n, a) {
              var l = this;
              this.onSlideObjectLoad(
                t,
                a,
                function () {
                  l.triggerSlideItemLoad(t, e, s, i, n);
                },
                function () {
                  t.addClass("lg-complete lg-complete_"),
                    t.html(
                      '<span class="lg-error-msg">Oops... Failed to load content...</span>'
                    );
                }
              );
            }),
            (t.prototype.triggerSlideItemLoad = function (t, e, s, i, n) {
              var a = this,
                l = this.galleryItems[e],
                r = n && "video" === this.getSlideType(l) && !l.poster ? i : 0;
              setTimeout(function () {
                t.addClass("lg-complete lg-complete_"),
                  a.LGel.trigger(zt, {
                    index: e,
                    delay: s || 0,
                    isFirstSlide: n,
                  });
              }, r);
            }),
            (t.prototype.isFirstSlideWithZoomAnimation = function () {
              return !(
                this.lGalleryOn ||
                !this.zoomFromOrigin ||
                !this.currentImageSize
              );
            }),
            (t.prototype.addSlideVideoInfo = function (t) {
              var e = this;
              t.forEach(function (t, s) {
                (t.__slideVideoInfo = re(t.src, !!t.video, s)),
                  t.__slideVideoInfo &&
                    e.settings.loadYouTubePoster &&
                    !t.poster &&
                    t.__slideVideoInfo.youtube &&
                    (t.poster =
                      "//img.youtube.com/vi/" +
                      t.__slideVideoInfo.youtube[1] +
                      "/maxresdefault.jpg");
              });
            }),
            (t.prototype.loadContent = function (t, e) {
              var s = this,
                i = this.galleryItems[t],
                n = Ut(this.getSlideItemId(t)),
                a = i.poster,
                l = i.srcset,
                r = i.sizes,
                o = i.sources,
                d = i.src,
                c = i.video,
                u = c && "string" == typeof c ? JSON.parse(c) : c;
              if (i.responsive) {
                var h = i.responsive.split(",");
                d = se(h) || d;
              }
              var p = i.__slideVideoInfo,
                m = "",
                g = !!i.iframe,
                f = !this.lGalleryOn,
                v = 0;
              if (
                (f &&
                  (v =
                    this.zoomFromOrigin && this.currentImageSize
                      ? this.settings.startAnimationDuration + 10
                      : this.settings.backdropDuration + 10),
                !n.hasClass("lg-loaded"))
              ) {
                if (p) {
                  var b = this.mediaContainerPosition,
                    y = b.top,
                    w = b.bottom,
                    S = Zt(
                      this.items[t],
                      this.outer,
                      y + w,
                      p && this.settings.videoMaxSize
                    );
                  m = this.getVideoContStyle(S);
                }
                if (g) {
                  var C = te(
                    this.settings.iframeWidth,
                    this.settings.iframeHeight,
                    this.settings.iframeMaxWidth,
                    this.settings.iframeMaxHeight,
                    d,
                    i.iframeTitle
                  );
                  n.prepend(C);
                } else if (a) {
                  var T = "";
                  f &&
                    this.zoomFromOrigin &&
                    this.currentImageSize &&
                    (T = this.getDummyImageContent(n, t, ""));
                  C = ne(a, T || "", m, this.settings.strings.playVideo, p);
                  n.prepend(C);
                } else if (p) {
                  C = '<div class="lg-video-cont " style="' + m + '"></div>';
                  n.prepend(C);
                } else if ((this.setImgMarkup(d, n, t), l || o)) {
                  var x = n.find(".lg-object");
                  this.initPictureFill(x);
                }
                (a || p) &&
                  this.LGel.trigger(kt, {
                    index: t,
                    src: d,
                    html5Video: u,
                    hasPoster: !!a,
                  }),
                  this.LGel.trigger(Lt, { index: t }),
                  this.lGalleryOn &&
                    ".lg-item" === this.settings.appendSubHtmlTo &&
                    this.addHtml(t);
              }
              var E = 0;
              v && !Ut(document.body).hasClass("lg-from-hash") && (E = v),
                this.isFirstSlideWithZoomAnimation() &&
                  (setTimeout(function () {
                    n.removeClass(
                      "lg-start-end-progress lg-start-progress"
                    ).removeAttr("style");
                  }, this.settings.startAnimationDuration + 100),
                  n.hasClass("lg-loaded") ||
                    setTimeout(function () {
                      if (
                        "image" === s.getSlideType(i) &&
                        (n
                          .find(".lg-img-wrap")
                          .append(ee(t, d, "", l, r, i.sources)),
                        l || o)
                      ) {
                        var e = n.find(".lg-object");
                        s.initPictureFill(e);
                      }
                      ("image" === s.getSlideType(i) ||
                        ("video" === s.getSlideType(i) && a)) &&
                        (s.onLgObjectLoad(n, t, v, E, !0, !1),
                        s.onSlideObjectLoad(
                          n,
                          !(!p || !p.html5 || a),
                          function () {
                            s.loadContentOnFirstSlideLoad(t, n, E);
                          },
                          function () {
                            s.loadContentOnFirstSlideLoad(t, n, E);
                          }
                        ));
                    }, this.settings.startAnimationDuration + 100)),
                n.addClass("lg-loaded"),
                (this.isFirstSlideWithZoomAnimation() &&
                  ("video" !== this.getSlideType(i) || a)) ||
                  this.onLgObjectLoad(n, t, v, E, f, !(!p || !p.html5 || a)),
                (this.zoomFromOrigin && this.currentImageSize) ||
                  !n.hasClass("lg-complete_") ||
                  this.lGalleryOn ||
                  setTimeout(function () {
                    n.addClass("lg-complete");
                  }, this.settings.backdropDuration),
                (this.lGalleryOn = !0),
                !0 === e &&
                  (n.hasClass("lg-complete_")
                    ? this.preload(t)
                    : n
                        .find(".lg-object")
                        .first()
                        .on("load.lg error.lg", function () {
                          s.preload(t);
                        }));
            }),
            (t.prototype.loadContentOnFirstSlideLoad = function (t, e, s) {
              var i = this;
              setTimeout(function () {
                e.find(".lg-dummy-img").remove(),
                  e.removeClass("lg-first-slide"),
                  i.outer.removeClass("lg-first-slide-loading"),
                  (i.isDummyImageRemoved = !0),
                  i.preload(t);
              }, s + 300);
            }),
            (t.prototype.getItemsToBeInsertedToDom = function (t, e, s) {
              var i = this;
              void 0 === s && (s = 0);
              var n = [],
                a = Math.max(s, 3);
              a = Math.min(a, this.galleryItems.length);
              var l = "lg-item-" + this.lgId + "-" + e;
              if (this.galleryItems.length <= 3)
                return (
                  this.galleryItems.forEach(function (t, e) {
                    n.push("lg-item-" + i.lgId + "-" + e);
                  }),
                  n
                );
              if (t < (this.galleryItems.length - 1) / 2) {
                for (var r = t; r > t - a / 2 && r >= 0; r--)
                  n.push("lg-item-" + this.lgId + "-" + r);
                var o = n.length;
                for (r = 0; r < a - o; r++)
                  n.push("lg-item-" + this.lgId + "-" + (t + r + 1));
              } else {
                for (
                  r = t;
                  r <= this.galleryItems.length - 1 && r < t + a / 2;
                  r++
                )
                  n.push("lg-item-" + this.lgId + "-" + r);
                for (o = n.length, r = 0; r < a - o; r++)
                  n.push("lg-item-" + this.lgId + "-" + (t - r - 1));
              }
              return (
                this.settings.loop &&
                  (t === this.galleryItems.length - 1
                    ? n.push("lg-item-" + this.lgId + "-0")
                    : 0 === t &&
                      n.push(
                        "lg-item-" +
                          this.lgId +
                          "-" +
                          (this.galleryItems.length - 1)
                      )),
                -1 === n.indexOf(l) && n.push("lg-item-" + this.lgId + "-" + e),
                n
              );
            }),
            (t.prototype.organizeSlideItems = function (t, e) {
              var s = this,
                i = this.getItemsToBeInsertedToDom(
                  t,
                  e,
                  this.settings.numberOfSlideItemsInDom
                );
              return (
                i.forEach(function (t) {
                  -1 === s.currentItemsInDom.indexOf(t) &&
                    s.$inner.append(
                      '<div id="' + t + '" class="lg-item"></div>'
                    );
                }),
                this.currentItemsInDom.forEach(function (t) {
                  -1 === i.indexOf(t) && Ut("#" + t).remove();
                }),
                i
              );
            }),
            (t.prototype.getPreviousSlideIndex = function () {
              var t = 0;
              try {
                var e = this.outer.find(".lg-current").first().attr("id");
                t = parseInt(e.split("-")[3]) || 0;
              } catch (e) {
                t = 0;
              }
              return t;
            }),
            (t.prototype.setDownloadValue = function (t) {
              if (this.settings.download) {
                var e = this.galleryItems[t];
                if (!1 === e.downloadUrl || "false" === e.downloadUrl)
                  this.outer.addClass("lg-hide-download");
                else {
                  var s = this.getElementById("lg-download");
                  this.outer.removeClass("lg-hide-download"),
                    s.attr("href", e.downloadUrl || e.src),
                    e.download && s.attr("download", e.download);
                }
              }
            }),
            (t.prototype.makeSlideAnimation = function (t, e, s) {
              var i = this;
              this.lGalleryOn && s.addClass("lg-slide-progress"),
                setTimeout(
                  function () {
                    i.outer.addClass("lg-no-trans"),
                      i.outer
                        .find(".lg-item")
                        .removeClass("lg-prev-slide lg-next-slide"),
                      "prev" === t
                        ? (e.addClass("lg-prev-slide"),
                          s.addClass("lg-next-slide"))
                        : (e.addClass("lg-next-slide"),
                          s.addClass("lg-prev-slide")),
                      setTimeout(function () {
                        i.outer.find(".lg-item").removeClass("lg-current"),
                          e.addClass("lg-current"),
                          i.outer.removeClass("lg-no-trans");
                      }, 50);
                  },
                  this.lGalleryOn ? this.settings.slideDelay : 0
                );
            }),
            (t.prototype.slide = function (t, e, s, i) {
              var n = this,
                a = this.getPreviousSlideIndex();
              if (
                ((this.currentItemsInDom = this.organizeSlideItems(t, a)),
                !this.lGalleryOn || a !== t)
              ) {
                var l = this.galleryItems.length;
                if (!this.lgBusy) {
                  this.settings.counter && this.updateCurrentCounter(t);
                  var r = this.getSlideItem(t),
                    o = this.getSlideItem(a),
                    d = this.galleryItems[t],
                    c = d.__slideVideoInfo;
                  if (
                    (this.outer.attr(
                      "data-lg-slide-type",
                      this.getSlideType(d)
                    ),
                    this.setDownloadValue(t),
                    c)
                  ) {
                    var u = this.mediaContainerPosition,
                      h = u.top,
                      p = u.bottom,
                      m = Zt(
                        this.items[t],
                        this.outer,
                        h + p,
                        c && this.settings.videoMaxSize
                      );
                    this.resizeVideoSlide(t, m);
                  }
                  if (
                    (this.LGel.trigger(Bt, {
                      prevIndex: a,
                      index: t,
                      fromTouch: !!e,
                      fromThumb: !!s,
                    }),
                    (this.lgBusy = !0),
                    clearTimeout(this.hideBarTimeout),
                    this.arrowDisable(t),
                    i || (t < a ? (i = "prev") : t > a && (i = "next")),
                    e)
                  ) {
                    this.outer
                      .find(".lg-item")
                      .removeClass("lg-prev-slide lg-current lg-next-slide");
                    var g = void 0,
                      f = void 0;
                    l > 2
                      ? ((g = t - 1),
                        (f = t + 1),
                        ((0 === t && a === l - 1) ||
                          (t === l - 1 && 0 === a)) &&
                          ((f = 0), (g = l - 1)))
                      : ((g = 0), (f = 1)),
                      "prev" === i
                        ? this.getSlideItem(f).addClass("lg-next-slide")
                        : this.getSlideItem(g).addClass("lg-prev-slide"),
                      r.addClass("lg-current");
                  } else this.makeSlideAnimation(i, r, o);
                  this.lGalleryOn
                    ? setTimeout(function () {
                        n.loadContent(t, !0),
                          ".lg-item" !== n.settings.appendSubHtmlTo &&
                            n.addHtml(t);
                      }, this.settings.speed +
                        50 +
                        (e ? 0 : this.settings.slideDelay))
                    : this.loadContent(t, !0),
                    setTimeout(function () {
                      (n.lgBusy = !1),
                        o.removeClass("lg-slide-progress"),
                        n.LGel.trigger(Gt, {
                          prevIndex: a,
                          index: t,
                          fromTouch: e,
                          fromThumb: s,
                        });
                    }, (this.lGalleryOn ? this.settings.speed + 100 : 100) +
                      (e ? 0 : this.settings.slideDelay));
                }
                this.index = t;
              }
            }),
            (t.prototype.updateCurrentCounter = function (t) {
              this.getElementById("lg-counter-current").html(t + 1 + "");
            }),
            (t.prototype.updateCounterTotal = function () {
              this.getElementById("lg-counter-all").html(
                this.galleryItems.length + ""
              );
            }),
            (t.prototype.getSlideType = function (t) {
              return t.__slideVideoInfo
                ? "video"
                : t.iframe
                ? "iframe"
                : "image";
            }),
            (t.prototype.touchMove = function (t, e, s) {
              var i = e.pageX - t.pageX,
                n = e.pageY - t.pageY,
                a = !1;
              if (
                (this.swipeDirection
                  ? (a = !0)
                  : Math.abs(i) > 15
                  ? ((this.swipeDirection = "horizontal"), (a = !0))
                  : Math.abs(n) > 15 &&
                    ((this.swipeDirection = "vertical"), (a = !0)),
                a)
              ) {
                var l = this.getSlideItem(this.index);
                if ("horizontal" === this.swipeDirection) {
                  null == s || s.preventDefault(),
                    this.outer.addClass("lg-dragging"),
                    this.setTranslate(l, i, 0);
                  var r = l.get().offsetWidth,
                    o = (15 * r) / 100 - Math.abs((10 * i) / 100);
                  this.setTranslate(
                    this.outer.find(".lg-prev-slide").first(),
                    -r + i - o,
                    0
                  ),
                    this.setTranslate(
                      this.outer.find(".lg-next-slide").first(),
                      r + i + o,
                      0
                    );
                } else if (
                  "vertical" === this.swipeDirection &&
                  this.settings.swipeToClose
                ) {
                  null == s || s.preventDefault(),
                    this.$container.addClass("lg-dragging-vertical");
                  var d = 1 - Math.abs(n) / window.innerHeight;
                  this.$backdrop.css("opacity", d);
                  var c = 1 - Math.abs(n) / (2 * window.innerWidth);
                  this.setTranslate(l, 0, n, c, c),
                    Math.abs(n) > 100 &&
                      this.outer
                        .addClass("lg-hide-items")
                        .removeClass("lg-components-open");
                }
              }
            }),
            (t.prototype.touchEnd = function (t, e, s) {
              var i,
                n = this;
              "lg-slide" !== this.settings.mode &&
                this.outer.addClass("lg-slide"),
                setTimeout(function () {
                  n.$container.removeClass("lg-dragging-vertical"),
                    n.outer
                      .removeClass("lg-dragging lg-hide-items")
                      .addClass("lg-components-open");
                  var a = !0;
                  if ("horizontal" === n.swipeDirection) {
                    i = t.pageX - e.pageX;
                    var l = Math.abs(t.pageX - e.pageX);
                    i < 0 && l > n.settings.swipeThreshold
                      ? (n.goToNextSlide(!0), (a = !1))
                      : i > 0 &&
                        l > n.settings.swipeThreshold &&
                        (n.goToPrevSlide(!0), (a = !1));
                  } else if ("vertical" === n.swipeDirection) {
                    if (
                      ((i = Math.abs(t.pageY - e.pageY)),
                      n.settings.closable && n.settings.swipeToClose && i > 100)
                    )
                      return void n.closeGallery();
                    n.$backdrop.css("opacity", 1);
                  }
                  if (
                    (n.outer.find(".lg-item").removeAttr("style"),
                    a && Math.abs(t.pageX - e.pageX) < 5)
                  ) {
                    var r = Ut(s.target);
                    n.isPosterElement(r) && n.LGel.trigger(qt);
                  }
                  n.swipeDirection = void 0;
                }),
                setTimeout(function () {
                  n.outer.hasClass("lg-dragging") ||
                    "lg-slide" === n.settings.mode ||
                    n.outer.removeClass("lg-slide");
                }, this.settings.speed + 100);
            }),
            (t.prototype.enableSwipe = function () {
              var t = this,
                e = {},
                s = {},
                i = !1,
                n = !1;
              this.settings.enableSwipe &&
                (this.$inner.on("touchstart.lg", function (s) {
                  t.dragOrSwipeEnabled = !0;
                  var i = t.getSlideItem(t.index);
                  (!Ut(s.target).hasClass("lg-item") &&
                    !i.get().contains(s.target)) ||
                    t.outer.hasClass("lg-zoomed") ||
                    t.lgBusy ||
                    1 !== s.targetTouches.length ||
                    ((n = !0),
                    (t.touchAction = "swipe"),
                    t.manageSwipeClass(),
                    (e = {
                      pageX: s.targetTouches[0].pageX,
                      pageY: s.targetTouches[0].pageY,
                    }));
                }),
                this.$inner.on("touchmove.lg", function (a) {
                  n &&
                    "swipe" === t.touchAction &&
                    1 === a.targetTouches.length &&
                    ((s = {
                      pageX: a.targetTouches[0].pageX,
                      pageY: a.targetTouches[0].pageY,
                    }),
                    t.touchMove(e, s, a),
                    (i = !0));
                }),
                this.$inner.on("touchend.lg", function (a) {
                  if ("swipe" === t.touchAction) {
                    if (i) (i = !1), t.touchEnd(s, e, a);
                    else if (n) {
                      var l = Ut(a.target);
                      t.isPosterElement(l) && t.LGel.trigger(qt);
                    }
                    (t.touchAction = void 0), (n = !1);
                  }
                }));
            }),
            (t.prototype.enableDrag = function () {
              var t = this,
                e = {},
                s = {},
                i = !1,
                n = !1;
              this.settings.enableDrag &&
                (this.outer.on("mousedown.lg", function (s) {
                  t.dragOrSwipeEnabled = !0;
                  var n = t.getSlideItem(t.index);
                  (Ut(s.target).hasClass("lg-item") ||
                    n.get().contains(s.target)) &&
                    (t.outer.hasClass("lg-zoomed") ||
                      t.lgBusy ||
                      (s.preventDefault(),
                      t.lgBusy ||
                        (t.manageSwipeClass(),
                        (e = { pageX: s.pageX, pageY: s.pageY }),
                        (i = !0),
                        (t.outer.get().scrollLeft += 1),
                        (t.outer.get().scrollLeft -= 1),
                        t.outer.removeClass("lg-grab").addClass("lg-grabbing"),
                        t.LGel.trigger(Ht))));
                }),
                Ut(window).on("mousemove.lg.global" + this.lgId, function (a) {
                  i &&
                    t.lgOpened &&
                    ((n = !0),
                    (s = { pageX: a.pageX, pageY: a.pageY }),
                    t.touchMove(e, s),
                    t.LGel.trigger(Nt));
                }),
                Ut(window).on("mouseup.lg.global" + this.lgId, function (a) {
                  if (t.lgOpened) {
                    var l = Ut(a.target);
                    n
                      ? ((n = !1), t.touchEnd(s, e, a), t.LGel.trigger(jt))
                      : t.isPosterElement(l) && t.LGel.trigger(qt),
                      i &&
                        ((i = !1),
                        t.outer.removeClass("lg-grabbing").addClass("lg-grab"));
                  }
                }));
            }),
            (t.prototype.triggerPosterClick = function () {
              var t = this;
              this.$inner.on("click.lg", function (e) {
                !t.dragOrSwipeEnabled &&
                  t.isPosterElement(Ut(e.target)) &&
                  t.LGel.trigger(qt);
              });
            }),
            (t.prototype.manageSwipeClass = function () {
              var t = this.index + 1,
                e = this.index - 1;
              this.settings.loop &&
                this.galleryItems.length > 2 &&
                (0 === this.index
                  ? (e = this.galleryItems.length - 1)
                  : this.index === this.galleryItems.length - 1 && (t = 0)),
                this.outer
                  .find(".lg-item")
                  .removeClass("lg-next-slide lg-prev-slide"),
                e > -1 && this.getSlideItem(e).addClass("lg-prev-slide"),
                this.getSlideItem(t).addClass("lg-next-slide");
            }),
            (t.prototype.goToNextSlide = function (t) {
              var e = this,
                s = this.settings.loop;
              t && this.galleryItems.length < 3 && (s = !1),
                this.lgBusy ||
                  (this.index + 1 < this.galleryItems.length
                    ? (this.index++,
                      this.LGel.trigger(Ft, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : s
                    ? ((this.index = 0),
                      this.LGel.trigger(Ft, { index: this.index }),
                      this.slide(this.index, !!t, !1, "next"))
                    : this.settings.slideEndAnimation &&
                      !t &&
                      (this.outer.addClass("lg-right-end"),
                      setTimeout(function () {
                        e.outer.removeClass("lg-right-end");
                      }, 400)));
            }),
            (t.prototype.goToPrevSlide = function (t) {
              var e = this,
                s = this.settings.loop;
              t && this.galleryItems.length < 3 && (s = !1),
                this.lgBusy ||
                  (this.index > 0
                    ? (this.index--,
                      this.LGel.trigger(Wt, {
                        index: this.index,
                        fromTouch: t,
                      }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : s
                    ? ((this.index = this.galleryItems.length - 1),
                      this.LGel.trigger(Wt, {
                        index: this.index,
                        fromTouch: t,
                      }),
                      this.slide(this.index, !!t, !1, "prev"))
                    : this.settings.slideEndAnimation &&
                      !t &&
                      (this.outer.addClass("lg-left-end"),
                      setTimeout(function () {
                        e.outer.removeClass("lg-left-end");
                      }, 400)));
            }),
            (t.prototype.keyPress = function () {
              var t = this;
              Ut(window).on("keydown.lg.global" + this.lgId, function (e) {
                t.lgOpened &&
                  !0 === t.settings.escKey &&
                  27 === e.keyCode &&
                  (e.preventDefault(),
                  t.settings.allowMediaOverlap &&
                  t.outer.hasClass("lg-can-toggle") &&
                  t.outer.hasClass("lg-components-open")
                    ? t.outer.removeClass("lg-components-open")
                    : t.closeGallery()),
                  t.lgOpened &&
                    t.galleryItems.length > 1 &&
                    (37 === e.keyCode &&
                      (e.preventDefault(), t.goToPrevSlide()),
                    39 === e.keyCode &&
                      (e.preventDefault(), t.goToNextSlide()));
              });
            }),
            (t.prototype.arrow = function () {
              var t = this;
              this.getElementById("lg-prev").on("click.lg", function () {
                t.goToPrevSlide();
              }),
                this.getElementById("lg-next").on("click.lg", function () {
                  t.goToNextSlide();
                });
            }),
            (t.prototype.arrowDisable = function (t) {
              if (!this.settings.loop && this.settings.hideControlOnEnd) {
                var e = this.getElementById("lg-prev"),
                  s = this.getElementById("lg-next");
                t + 1 === this.galleryItems.length
                  ? s.attr("disabled", "disabled").addClass("disabled")
                  : s.removeAttr("disabled").removeClass("disabled"),
                  0 === t
                    ? e.attr("disabled", "disabled").addClass("disabled")
                    : e.removeAttr("disabled").removeClass("disabled");
              }
            }),
            (t.prototype.setTranslate = function (t, e, s, i, n) {
              void 0 === i && (i = 1),
                void 0 === n && (n = 1),
                t.css(
                  "transform",
                  "translate3d(" +
                    e +
                    "px, " +
                    s +
                    "px, 0px) scale3d(" +
                    i +
                    ", " +
                    n +
                    ", 1)"
                );
            }),
            (t.prototype.mousewheel = function () {
              var t = this,
                e = 0;
              this.outer.on("wheel.lg", function (s) {
                if (s.deltaY && !(t.galleryItems.length < 2)) {
                  s.preventDefault();
                  var i = new Date().getTime();
                  i - e < 1e3 ||
                    ((e = i),
                    s.deltaY > 0
                      ? t.goToNextSlide()
                      : s.deltaY < 0 && t.goToPrevSlide());
                }
              });
            }),
            (t.prototype.isSlideElement = function (t) {
              return (
                t.hasClass("lg-outer") ||
                t.hasClass("lg-item") ||
                t.hasClass("lg-img-wrap")
              );
            }),
            (t.prototype.isPosterElement = function (t) {
              var e = this.getSlideItem(this.index)
                .find(".lg-video-play-button")
                .get();
              return (
                t.hasClass("lg-video-poster") ||
                t.hasClass("lg-video-play-button") ||
                (e && e.contains(t.get()))
              );
            }),
            (t.prototype.toggleMaximize = function () {
              var t = this;
              this.getElementById("lg-maximize").on("click.lg", function () {
                t.$container.toggleClass("lg-inline"), t.refreshOnResize();
              });
            }),
            (t.prototype.invalidateItems = function () {
              for (var t = 0; t < this.items.length; t++) {
                var e = Ut(this.items[t]);
                e.off("click.lgcustom-item-" + e.attr("data-lg-id"));
              }
            }),
            (t.prototype.manageCloseGallery = function () {
              var t = this;
              if (this.settings.closable) {
                var e = !1;
                this.getElementById("lg-close").on("click.lg", function () {
                  t.closeGallery();
                }),
                  this.settings.closeOnTap &&
                    (this.outer.on("mousedown.lg", function (s) {
                      var i = Ut(s.target);
                      e = !!t.isSlideElement(i);
                    }),
                    this.outer.on("mousemove.lg", function () {
                      e = !1;
                    }),
                    this.outer.on("mouseup.lg", function (s) {
                      var i = Ut(s.target);
                      t.isSlideElement(i) &&
                        e &&
                        (t.outer.hasClass("lg-dragging") || t.closeGallery());
                    }));
              }
            }),
            (t.prototype.closeGallery = function (t) {
              var e = this;
              if (!this.lgOpened || (!this.settings.closable && !t)) return 0;
              this.LGel.trigger(Vt), Ut(window).scrollTop(this.prevScrollTop);
              var s,
                i = this.items[this.index];
              if (this.zoomFromOrigin && i) {
                var n = this.mediaContainerPosition,
                  a = n.top,
                  l = n.bottom,
                  r = this.galleryItems[this.index],
                  o = r.__slideVideoInfo,
                  d = r.poster,
                  c = Zt(
                    i,
                    this.outer,
                    a + l,
                    o && d && this.settings.videoMaxSize
                  );
                s = Jt(i, this.outer, a, l, c);
              }
              this.zoomFromOrigin && s
                ? (this.outer.addClass("lg-closing lg-zoom-from-image"),
                  this.getSlideItem(this.index)
                    .addClass("lg-start-end-progress")
                    .css(
                      "transition-duration",
                      this.settings.startAnimationDuration + "ms"
                    )
                    .css("transform", s))
                : (this.outer.addClass("lg-hide-items"),
                  this.outer.removeClass("lg-zoom-from-image")),
                this.destroyModules(),
                (this.lGalleryOn = !1),
                (this.isDummyImageRemoved = !1),
                (this.zoomFromOrigin = this.settings.zoomFromOrigin),
                clearTimeout(this.hideBarTimeout),
                (this.hideBarTimeout = !1),
                Ut("html").removeClass("lg-on"),
                this.outer.removeClass("lg-visible lg-components-open"),
                this.$backdrop.removeClass("in").css("opacity", 0);
              var u =
                this.zoomFromOrigin && s
                  ? Math.max(
                      this.settings.startAnimationDuration,
                      this.settings.backdropDuration
                    )
                  : this.settings.backdropDuration;
              return (
                this.$container.removeClass("lg-show-in"),
                setTimeout(function () {
                  e.zoomFromOrigin &&
                    s &&
                    e.outer.removeClass("lg-zoom-from-image"),
                    e.$container.removeClass("lg-show"),
                    e.$backdrop
                      .removeAttr("style")
                      .css(
                        "transition-duration",
                        e.settings.backdropDuration + "ms"
                      ),
                    e.outer.removeClass("lg-closing " + e.settings.startClass),
                    e
                      .getSlideItem(e.index)
                      .removeClass("lg-start-end-progress"),
                    e.$inner.empty(),
                    e.lgOpened && e.LGel.trigger(Xt, { instance: e }),
                    e.outer.get() && e.outer.get().blur(),
                    (e.lgOpened = !1);
                }, u + 100),
                u + 100
              );
            }),
            (t.prototype.initModules = function () {
              this.plugins.forEach(function (t) {
                try {
                  t.init();
                } catch (t) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly initiated"
                  );
                }
              });
            }),
            (t.prototype.destroyModules = function (t) {
              this.plugins.forEach(function (e) {
                try {
                  t ? e.destroy() : e.closeGallery && e.closeGallery();
                } catch (t) {
                  console.warn(
                    "lightGallery:- make sure lightGallery module is properly destroyed"
                  );
                }
              });
            }),
            (t.prototype.refresh = function (t) {
              this.settings.dynamic || this.invalidateItems(),
                (this.galleryItems = t || this.getItems()),
                this.updateControls(),
                this.openGalleryOnItemClick(),
                this.LGel.trigger(Ot);
            }),
            (t.prototype.updateControls = function () {
              this.addSlideVideoInfo(this.galleryItems),
                this.updateCounterTotal(),
                this.manageSingleSlideClassName();
            }),
            (t.prototype.destroy = function () {
              var t = this,
                e = this.closeGallery(!0);
              return (
                setTimeout(function () {
                  t.destroyModules(!0),
                    t.settings.dynamic || t.invalidateItems(),
                    Ut(window).off(".lg.global" + t.lgId),
                    t.LGel.off(".lg"),
                    t.$container.remove();
                }, e),
                e
              );
            }),
            t
          );
        })();
      const ce = function (t, e) {
        return new de(t, e);
      };
      var ue = function () {
          return (
            (ue =
              Object.assign ||
              function (t) {
                for (var e, s = 1, i = arguments.length; s < i; s++)
                  for (var n in (e = arguments[s]))
                    Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t;
              }),
            ue.apply(this, arguments)
          );
        },
        he = {
          thumbnail: !0,
          animateThumb: !0,
          currentPagerPosition: "middle",
          alignThumbnails: "middle",
          thumbWidth: 100,
          thumbHeight: "80px",
          thumbMargin: 5,
          appendThumbnailsTo: ".lg-components",
          toggleThumb: !1,
          enableThumbDrag: !0,
          enableThumbSwipe: !0,
          thumbnailSwipeThreshold: 10,
          loadYouTubeThumbnail: !0,
          youTubeThumbSize: 1,
          thumbnailPluginStrings: { toggleThumbnails: "Toggle thumbnails" },
        },
        pe = "lgContainerResize",
        me = "lgUpdateSlides",
        ge = "lgBeforeOpen",
        fe = "lgBeforeSlide",
        ve = (function () {
          function t(t, e) {
            return (
              (this.thumbOuterWidth = 0),
              (this.thumbTotalWidth = 0),
              (this.translateX = 0),
              (this.thumbClickable = !1),
              (this.core = t),
              (this.$LG = e),
              this
            );
          }
          return (
            (t.prototype.init = function () {
              (this.settings = ue(ue({}, he), this.core.settings)),
                (this.thumbOuterWidth = 0),
                (this.thumbTotalWidth =
                  this.core.galleryItems.length *
                  (this.settings.thumbWidth + this.settings.thumbMargin)),
                (this.translateX = 0),
                this.setAnimateThumbStyles(),
                this.core.settings.allowMediaOverlap ||
                  (this.settings.toggleThumb = !1),
                this.settings.thumbnail &&
                  (this.build(),
                  this.settings.animateThumb
                    ? (this.settings.enableThumbDrag && this.enableThumbDrag(),
                      this.settings.enableThumbSwipe && this.enableThumbSwipe(),
                      (this.thumbClickable = !1))
                    : (this.thumbClickable = !0),
                  this.toggleThumbBar(),
                  this.thumbKeyPress());
            }),
            (t.prototype.build = function () {
              var t = this;
              this.setThumbMarkup(),
                this.manageActiveClassOnSlideChange(),
                this.$lgThumb.first().on("click.lg touchend.lg", function (e) {
                  var s = t.$LG(e.target);
                  s.hasAttribute("data-lg-item-id") &&
                    setTimeout(function () {
                      if (t.thumbClickable && !t.core.lgBusy) {
                        var e = parseInt(s.attr("data-lg-item-id"));
                        t.core.slide(e, !1, !0, !1);
                      }
                    }, 50);
                }),
                this.core.LGel.on(fe + ".thumb", function (e) {
                  var s = e.detail.index;
                  t.animateThumb(s);
                }),
                this.core.LGel.on(ge + ".thumb", function () {
                  t.thumbOuterWidth = t.core.outer.get().offsetWidth;
                }),
                this.core.LGel.on(me + ".thumb", function () {
                  t.rebuildThumbnails();
                }),
                this.core.LGel.on(pe + ".thumb", function () {
                  t.core.lgOpened &&
                    setTimeout(function () {
                      (t.thumbOuterWidth = t.core.outer.get().offsetWidth),
                        t.animateThumb(t.core.index),
                        (t.thumbOuterWidth = t.core.outer.get().offsetWidth);
                    }, 50);
                });
            }),
            (t.prototype.setThumbMarkup = function () {
              var t = "lg-thumb-outer ";
              this.settings.alignThumbnails &&
                (t += "lg-thumb-align-" + this.settings.alignThumbnails);
              var e =
                '<div class="' +
                t +
                '">\n        <div class="lg-thumb lg-group">\n        </div>\n        </div>';
              this.core.outer.addClass("lg-has-thumb"),
                ".lg-components" === this.settings.appendThumbnailsTo
                  ? this.core.$lgComponents.append(e)
                  : this.core.outer.append(e),
                (this.$thumbOuter = this.core.outer
                  .find(".lg-thumb-outer")
                  .first()),
                (this.$lgThumb = this.core.outer.find(".lg-thumb").first()),
                this.settings.animateThumb &&
                  this.core.outer
                    .find(".lg-thumb")
                    .css("transition-duration", this.core.settings.speed + "ms")
                    .css("width", this.thumbTotalWidth + "px")
                    .css("position", "relative"),
                this.setThumbItemHtml(this.core.galleryItems);
            }),
            (t.prototype.enableThumbDrag = function () {
              var t = this,
                e = {
                  cords: { startX: 0, endX: 0 },
                  isMoved: !1,
                  newTranslateX: 0,
                  startTime: new Date(),
                  endTime: new Date(),
                  touchMoveTime: 0,
                },
                s = !1;
              this.$thumbOuter.addClass("lg-grab"),
                this.core.outer
                  .find(".lg-thumb")
                  .first()
                  .on("mousedown.lg.thumb", function (i) {
                    t.thumbTotalWidth > t.thumbOuterWidth &&
                      (i.preventDefault(),
                      (e.cords.startX = i.pageX),
                      (e.startTime = new Date()),
                      (t.thumbClickable = !1),
                      (s = !0),
                      (t.core.outer.get().scrollLeft += 1),
                      (t.core.outer.get().scrollLeft -= 1),
                      t.$thumbOuter
                        .removeClass("lg-grab")
                        .addClass("lg-grabbing"));
                  }),
                this.$LG(window).on(
                  "mousemove.lg.thumb.global" + this.core.lgId,
                  function (i) {
                    t.core.lgOpened &&
                      s &&
                      ((e.cords.endX = i.pageX), (e = t.onThumbTouchMove(e)));
                  }
                ),
                this.$LG(window).on(
                  "mouseup.lg.thumb.global" + this.core.lgId,
                  function () {
                    t.core.lgOpened &&
                      (e.isMoved
                        ? (e = t.onThumbTouchEnd(e))
                        : (t.thumbClickable = !0),
                      s &&
                        ((s = !1),
                        t.$thumbOuter
                          .removeClass("lg-grabbing")
                          .addClass("lg-grab")));
                  }
                );
            }),
            (t.prototype.enableThumbSwipe = function () {
              var t = this,
                e = {
                  cords: { startX: 0, endX: 0 },
                  isMoved: !1,
                  newTranslateX: 0,
                  startTime: new Date(),
                  endTime: new Date(),
                  touchMoveTime: 0,
                };
              this.$lgThumb.on("touchstart.lg", function (s) {
                t.thumbTotalWidth > t.thumbOuterWidth &&
                  (s.preventDefault(),
                  (e.cords.startX = s.targetTouches[0].pageX),
                  (t.thumbClickable = !1),
                  (e.startTime = new Date()));
              }),
                this.$lgThumb.on("touchmove.lg", function (s) {
                  t.thumbTotalWidth > t.thumbOuterWidth &&
                    (s.preventDefault(),
                    (e.cords.endX = s.targetTouches[0].pageX),
                    (e = t.onThumbTouchMove(e)));
                }),
                this.$lgThumb.on("touchend.lg", function () {
                  e.isMoved
                    ? (e = t.onThumbTouchEnd(e))
                    : (t.thumbClickable = !0);
                });
            }),
            (t.prototype.rebuildThumbnails = function () {
              var t = this;
              this.$thumbOuter.addClass("lg-rebuilding-thumbnails"),
                setTimeout(function () {
                  (t.thumbTotalWidth =
                    t.core.galleryItems.length *
                    (t.settings.thumbWidth + t.settings.thumbMargin)),
                    t.$lgThumb.css("width", t.thumbTotalWidth + "px"),
                    t.$lgThumb.empty(),
                    t.setThumbItemHtml(t.core.galleryItems),
                    t.animateThumb(t.core.index);
                }, 50),
                setTimeout(function () {
                  t.$thumbOuter.removeClass("lg-rebuilding-thumbnails");
                }, 200);
            }),
            (t.prototype.setTranslate = function (t) {
              this.$lgThumb.css(
                "transform",
                "translate3d(-" + t + "px, 0px, 0px)"
              );
            }),
            (t.prototype.getPossibleTransformX = function (t) {
              return (
                t > this.thumbTotalWidth - this.thumbOuterWidth &&
                  (t = this.thumbTotalWidth - this.thumbOuterWidth),
                t < 0 && (t = 0),
                t
              );
            }),
            (t.prototype.animateThumb = function (t) {
              if (
                (this.$lgThumb.css(
                  "transition-duration",
                  this.core.settings.speed + "ms"
                ),
                this.settings.animateThumb)
              ) {
                var e = 0;
                switch (this.settings.currentPagerPosition) {
                  case "left":
                    e = 0;
                    break;
                  case "middle":
                    e = this.thumbOuterWidth / 2 - this.settings.thumbWidth / 2;
                    break;
                  case "right":
                    e = this.thumbOuterWidth - this.settings.thumbWidth;
                }
                (this.translateX =
                  (this.settings.thumbWidth + this.settings.thumbMargin) * t -
                  1 -
                  e),
                  this.translateX >
                    this.thumbTotalWidth - this.thumbOuterWidth &&
                    (this.translateX =
                      this.thumbTotalWidth - this.thumbOuterWidth),
                  this.translateX < 0 && (this.translateX = 0),
                  this.setTranslate(this.translateX);
              }
            }),
            (t.prototype.onThumbTouchMove = function (t) {
              return (
                (t.newTranslateX = this.translateX),
                (t.isMoved = !0),
                (t.touchMoveTime = new Date().valueOf()),
                (t.newTranslateX -= t.cords.endX - t.cords.startX),
                (t.newTranslateX = this.getPossibleTransformX(t.newTranslateX)),
                this.setTranslate(t.newTranslateX),
                this.$thumbOuter.addClass("lg-dragging"),
                t
              );
            }),
            (t.prototype.onThumbTouchEnd = function (t) {
              (t.isMoved = !1),
                (t.endTime = new Date()),
                this.$thumbOuter.removeClass("lg-dragging");
              var e = t.endTime.valueOf() - t.startTime.valueOf(),
                s = t.cords.endX - t.cords.startX,
                i = Math.abs(s) / e;
              return (
                i > 0.15 && t.endTime.valueOf() - t.touchMoveTime < 30
                  ? ((i += 1) > 2 && (i += 1),
                    (i += i * (Math.abs(s) / this.thumbOuterWidth)),
                    this.$lgThumb.css(
                      "transition-duration",
                      Math.min(i - 1, 2) + "settings"
                    ),
                    (s *= i),
                    (this.translateX = this.getPossibleTransformX(
                      this.translateX - s
                    )),
                    this.setTranslate(this.translateX))
                  : (this.translateX = t.newTranslateX),
                Math.abs(t.cords.endX - t.cords.startX) <
                  this.settings.thumbnailSwipeThreshold &&
                  (this.thumbClickable = !0),
                t
              );
            }),
            (t.prototype.getThumbHtml = function (t, e) {
              var s,
                i = this.core.galleryItems[e].__slideVideoInfo || {};
              return (
                (s =
                  i.youtube && this.settings.loadYouTubeThumbnail
                    ? "//img.youtube.com/vi/" +
                      i.youtube[1] +
                      "/" +
                      this.settings.youTubeThumbSize +
                      ".jpg"
                    : t),
                '<div data-lg-item-id="' +
                  e +
                  '" class="lg-thumb-item ' +
                  (e === this.core.index ? " active" : "") +
                  '" \n        style="width:' +
                  this.settings.thumbWidth +
                  "px; height: " +
                  this.settings.thumbHeight +
                  ";\n            margin-right: " +
                  this.settings.thumbMargin +
                  'px;">\n            <img data-lg-item-id="' +
                  e +
                  '" src="' +
                  s +
                  '" />\n        </div>'
              );
            }),
            (t.prototype.getThumbItemHtml = function (t) {
              for (var e = "", s = 0; s < t.length; s++)
                e += this.getThumbHtml(t[s].thumb, s);
              return e;
            }),
            (t.prototype.setThumbItemHtml = function (t) {
              var e = this.getThumbItemHtml(t);
              this.$lgThumb.html(e);
            }),
            (t.prototype.setAnimateThumbStyles = function () {
              this.settings.animateThumb &&
                this.core.outer.addClass("lg-animate-thumb");
            }),
            (t.prototype.manageActiveClassOnSlideChange = function () {
              var t = this;
              this.core.LGel.on(fe + ".thumb", function (e) {
                var s = t.core.outer.find(".lg-thumb-item"),
                  i = e.detail.index;
                s.removeClass("active"), s.eq(i).addClass("active");
              });
            }),
            (t.prototype.toggleThumbBar = function () {
              var t = this;
              this.settings.toggleThumb &&
                (this.core.outer.addClass("lg-can-toggle"),
                this.core.$toolbar.append(
                  '<button type="button" aria-label="' +
                    this.settings.thumbnailPluginStrings.toggleThumbnails +
                    '" class="lg-toggle-thumb lg-icon"></button>'
                ),
                this.core.outer
                  .find(".lg-toggle-thumb")
                  .first()
                  .on("click.lg", function () {
                    t.core.outer.toggleClass("lg-components-open");
                  }));
            }),
            (t.prototype.thumbKeyPress = function () {
              var t = this;
              this.$LG(window).on(
                "keydown.lg.thumb.global" + this.core.lgId,
                function (e) {
                  t.core.lgOpened &&
                    t.settings.toggleThumb &&
                    (38 === e.keyCode
                      ? (e.preventDefault(),
                        t.core.outer.addClass("lg-components-open"))
                      : 40 === e.keyCode &&
                        (e.preventDefault(),
                        t.core.outer.removeClass("lg-components-open")));
                }
              );
            }),
            (t.prototype.destroy = function () {
              this.settings.thumbnail &&
                (this.$LG(window).off(".lg.thumb.global" + this.core.lgId),
                this.core.LGel.off(".lg.thumb"),
                this.core.LGel.off(".thumb"),
                this.$thumbOuter.remove(),
                this.core.outer.removeClass("lg-has-thumb"));
            }),
            t
          );
        })();
      const be = ve,
        ye = document.querySelectorAll("[data-gallery]");
      function we() {
        const t = document.querySelector(".product__button"),
          e = document.querySelector(".cart__items"),
          s = document.querySelector(".cart"),
          i = s.querySelector(".cart__quantity"),
          n = s.querySelector(".cart__icon-bag"),
          a = document.querySelector(".cart__total-price");
        let l = 0;
        const r = (t) => t.replace(/\D/g, ""),
          o = (t) => String(t).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 "),
          d = () => {
            a.textContent = `$ ${o(l)}`;
          },
          c = () => {
            let t = e.children.length;
            (i.textContent = t),
              (n.textContent = t),
              t > 0 ? s.classList.add("active") : s.classList.remove("active");
          },
          u = (t) => {
            if (document.querySelector(".product__info")) {
              let t = document.querySelectorAll(".item-cart");
              t &&
                t.forEach((t) => {
                  let e = document.querySelector(".product__info").dataset.id;
                  console.log(e),
                    t.dataset.id == e &&
                      document
                        .querySelector(".product__button")
                        .classList.remove("_hold");
                });
            }
            ((t) => {
              l -= t;
            })(parseInt(r(t.querySelector(".item-cart__price").textContent))),
              t.remove(),
              d(),
              c(),
              h();
          },
          h = () => {
            let t = e.innerHTML;
            t.length
              ? localStorage.setItem("products", t)
              : localStorage.removeItem("products");
          };
        t &&
          t.addEventListener("click", (t) => {
            let s = t.currentTarget,
              i = s.closest(".product__info"),
              n = i.dataset.id,
              a = i.querySelector(".product-slider__img").getAttribute("src"),
              u = i.querySelector(".product__title").textContent,
              p = r(i.querySelector(".product__price").textContent),
              m = parseInt(r(i.querySelector(".product__price").textContent)),
              g = document.querySelector(".product__size").value;
            (l += m),
              d(),
              e.insertAdjacentHTML(
                "beforeend",
                ((t, e, s, i, n) =>
                  `\n\t\t\t\t<div data-id="${t}" class="cart__item item-cart">\n\t\t\t\t<div class="item-cart__image">\n\t\t\t\t\t<img src="${e}" alt="">\n\t\t\t\t</div>\n\t\t\t\t<div class="item-cart__info">\n\t\t\t\t\t<div class="item-cart__name">${s}</div>\n\t\t\t\t\t<div class="item-cart__price">$ ${o(
                    i
                  )}</div>\n\t\t\t\t\t<div class="item-cart__size">Size: ${n}</div>\n\t\t\t\t</div>\n\t\t\t\t<a href="#/" class="item-cart__delete">\n\t\t\t\t\t<img src="img/icons/trash-del.svg" alt="">\n\t\t\t\t</a>\n\t\t\t\t</div>\n\t\t`)(
                  n,
                  a,
                  u,
                  p,
                  g
                )
              ),
              c(),
              s.classList.add("_hold"),
              h();
          }),
          e.addEventListener("click", (t) => {
            t.target.classList.contains("item-cart__delete") &&
              u(t.target.closest(".item-cart"));
          });
        (() => {
          null !== localStorage.getItem("products") &&
            ((e.innerHTML = localStorage.getItem("products")),
            c(),
            document.querySelectorAll(".cart__item").forEach((t) => {
              l += parseInt(
                r(t.querySelector(".item-cart__price").textContent)
              );
            }),
            d());
          let t = document.querySelectorAll(".item-cart");
          t &&
            t.forEach((t) => {
              if (document.querySelector(".product__info")) {
                document.querySelector(".product__info").dataset.id ==
                  t.dataset.id &&
                  document
                    .querySelector(".product__button")
                    .classList.add("_hold");
              }
            });
        })();
      }
      ye.length &&
        ye.forEach((t) => {
          ce(t, {
            plugins: [be],
            licenseKey: "7EC452A9-0CFD441C-BD984C7C-17C8456E",
            speed: 500,
          });
        }),
        we();
      const Se = JSON.parse(
        '{"R":[{"id":1,"image":"img/catalog/product-img1.jpg","title":"Blouse","price":"$38","label":""},{"id":2,"image":"img/catalog/product-img2.jpg","title":"Black Sweetshirt","price":"$23","label":""},{"id":3,"image":"img/catalog/product-img3.jpg","title":"Red T-shirt","price":"$10","label":""},{"id":4,"image":"img/catalog/product-img4.jpg","title":"Black T-shirt","price":"$11","label":"img/icons/sale.svg"},{"id":5,"image":"img/catalog/product-img3.jpg","title":"Red T-shirt","price":"$20","label":""},{"id":6,"image":"img/catalog/product-img4.jpg","title":"Black T-shirt","price":"$15","label":"img/icons/sale.svg"},{"id":7,"image":"img/catalog/product-img1.jpg","title":"Blouse ","price":"$33","label":""},{"id":8,"image":"img/catalog/product-img2.jpg","title":"Black Sweetshirt","price":"$27","label":""},{"id":9,"image":"img/catalog/product-img4.jpg","title":"Black T-shirt","price":"$12","label":"img/icons/sale.svg"},{"id":10,"image":"img/catalog/product-img3.jpg","title":"Red T-shirt","price":"$20","label":""},{"id":11,"image":"img/catalog/product-img1.jpg","title":"Blouse","price":"$24","label":""},{"id":12,"image":"img/catalog/product-img2.jpg","title":"Sweatshirt","price":"$18","label":""},{"id":13,"image":"img/catalog/product-img2.jpg","title":"Sweatshirt","price":"$10","label":""},{"id":14,"image":"img/catalog/product-img1.jpg","title":"Blouse","price":"$16","label":""},{"id":15,"image":"img/catalog/product-img3.jpg","title":"Red T-shirt","price":"$12","label":""},{"id":16,"image":"img/catalog/product-img4.jpg","title":"Black T-shirt","price":"$19","label":"img/icons/sale.svg"}]}'
      );
      function Ce(t) {
        let e = Se.R;
        if (t.classList.contains("catalog__products-inner")) {
          e = Se.R.slice(0, 8);
        }
        e.forEach((e) => {
          const s = e.id,
            i = e.image,
            n = e.title,
            a = e.price;
          let l = e.label;
          l &&
            (l = `<div class="product-card__sale"><img src="${l}" alt=""></div>`);
          let r = `<a href="#/" data-goto="#catalog"  data-pid="${s}" class="catalog__product-card product-card">\n\t\t\t<div class="product-card__image-ibg">\n\t\t\t\t<img class="product-card__img" src="${i}" alt="Non est magna">\n\t\t\t</div>\n\t\t\t<div class="product-card__desc">\n\t\t\t\t<span class="product-card__label">${n}</span>\n\t\t\t\t<span class="product-card__price">${a}</span>\n\t\t\t</div>\n\t\t\t${l}\n\t\t</a>`;
          t.insertAdjacentHTML("beforeend", r);
        });
      }
      function Te(t) {
        const e = document.querySelector(".catalog__container");
        let s = Se.R.find((e) => e.id == t);
        if ((s.id = t)) {
          let t = `<div class="product__info" data-id="${s.id}">\n\t\t<div class="product__images">\n\t\t\t<div class="product-slider">\n\t\t\t\t<div class="product-slider__swiper">\n\t\t\t\t\t<div class="product-slider__slide">\n\t\t\t\t\t\t<div class="product-slider__image">\n\t\t\t\t\t\t\t<img class="product-slider__img" src="${s.image}" alt="blouse">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-slider__slide">\n\t\t\t\t\t\t<div class="product-slider__image">\n\t\t\t\t\t\t\t<img src="${s.image}" alt="blouse">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-slider__slide">\n\t\t\t\t\t\t<div class="product-slider__image">\n\t\t\t\t\t\t\t<img src="${s.image}" alt="blouse">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="product-slider__btn-prev"></div>\n\t\t\t\t<div class="product-slider__btn-next"></div>\n\t\t\t</div>\n\t\t\t<div class="product-thumb">\n\t\t\t\t<div class="product-thumb__swiper">\n\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t<img src="${s.image}" alt="blouse">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t<img src="${s.image}" alt="blouse">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-thumb__slide">\n\t\t\t\t\t\t<div class="product-thumb__image">\n\t\t\t\t\t\t\t<img src="${s.image}" alt="blouse">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class="product__content">\n\t\t\t<div class="product__vendor">Vendor code <span>1257876</span></div>\n\t\t\t<h2 class="product__title">${s.title}</h2>\n\t\t\t<div class="product__desc">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean\n\t\t\t\tcommodo ligula eget dolor. Aenean massa.\n\t\t\t</div>\n\t\t\t<div class="product__price">${s.price}</div>\n\t\t\t<form method="#" class="product__params">\n\t\t\t\t<div class="product__select">\n\t\t\t\t\t<div class="product__item">\n\t\t\t\t\t\t<div class="product__label">Size</div>\n\t\t\t\t\t\t<select name="form[size]" class="product__size">\n\t\t\t\t\t\t\t<option value="S" selected>S</option>\n\t\t\t\t\t\t\t<option value="M">M</option>\n\t\t\t\t\t\t\t<option value="L">L</option>\n\t\t\t\t\t\t\t<option value="XL">XL</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product__item ">\n\t\t\t\t\t\t<div class="product__label">Color</div>\n\t\t\t\t\t\t<div class="product__color">\n\t\t\t\t\t\t\t<div class="color-pick">\n\t\t\t\t\t\t\t\t<input checked id="c_1" class="color-pick__input" type="radio" value="gray"\n\t\t\t\t\t\t\t\t\tname="form[color]">\n\t\t\t\t\t\t\t\t<label for="c_1" class="color-pick__label">\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="color-pick color-pick_black">\n\t\t\t\t\t\t\t\t<input id="c_1" class="color-pick__input" type="radio" value="black"\n\t\t\t\t\t\t\t\t\tname="form[color]">\n\t\t\t\t\t\t\t\t<label for="c_1" class="color-pick__label">\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="color-pick color-pick_yellow">\n\t\t\t\t\t\t\t\t<input id="c_1" class="color-pick__input" type="radio" value="yellow"\n\t\t\t\t\t\t\t\t\tname="form[color]">\n\t\t\t\t\t\t\t\t<label for="c_1" class="color-pick__label">\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="product__submit">\n\t\t\t\t\t<button data-cart type="button" class="product__button button">\n\t\t\t\t\t\t<span>Add to cart</span>\n\t\t\t\t\t\t<span>Item in cart</span>\n\t\t\t\t\t</button>\n\t\t\t\t\t<button type="button" class="product__favorites _icon-heart" href="#/"></button>\n\t\t\t\t</div>\n\t\t\t</form>\n\n\t\t\t<div data-tabs data-tabs-animate class="product__spec">\n\t\t\t\t<nav data-tabs-titles class="product-spec__navigation">\n\t\t\t\t\t<button type="submit" class="product-spec__title _tab-active">details</button>\n\t\t\t\t\t<button type="submit" class="product-spec__title">characteristics</button>\n\n\t\t\t\t</nav>\n\t\t\t\t<div data-tabs-body class="product-spec__content">\n\t\t\t\t\t<div class="product-spec__body">\n\t\t\t\t\t\t<table>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>Consist</td>\n\t\t\t\t\t\t\t\t<td>60% poliester, 40% cotton</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>Style</td>\n\t\t\t\t\t\t\t\t<td>Casual</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>Season</td>\n\t\t\t\t\t\t\t\t<td>Summer</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t<td>Made in</td>\n\t\t\t\t\t\t\t\t<td>USA</td>\n\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-spec__body">\n\t\t\t\t\t<table>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Washing instructions</td>\n\t\t\t\t\t\t<td>Dry Clean Only</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Brand style ID</td>\n\t\t\t\t\t\t<td>531956Y2E51</td>\n\t\t\t\t\t</tr>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>Wearing</td>\n\t\t\t\t\t\t<td>The model is 1.76 m wearing size 39</td>\n\t\t\t\t\t</tr>\n\t\t\t\t</table>\n\t\t\t\t\t</div>\n\n\t\t\t\t</div>\n\t\t\t</div>\n\n\t\t</div>\n\t\t<a href="catalog.html" class="product__button-back"> Catalog</a>\n\t</div> \n\n\t<div class="product__recommend">\n\t<div class="product-recommend">\n\t<div class="product-recommend__title title">Recommend</div>\n\t\t<div class="product-recommend__swiper">\n\t\t\t<div class="product-recommend__slide">\n\t\t\t\t<a href="#/" class=" product-card" data-pid="1" data-goto="#catalog">\n\t\t\t\t\t<div class="product-card__image-ibg">\n\t\t\t\t\t\t<img class="product-card__img" src="img/catalog/product-img1.jpg" alt="Non est magna">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-card__desc">\n\t\t\t\t\t\t<span class="product-card__label">Non est magna</span>\n\t\t\t\t\t\t<span class="product-card__price">$38</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="product-recommend__slide">\n\t\t\t\t<a href="#/" class=" product-card" data-pid="2" data-goto="#catalog">\n\t\t\t\t\t<div class="product-card__image-ibg">\n\t\t\t\t\t\t<img class="product-card__img" src="img/catalog/product-img2.jpg" alt="Non est magna">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-card__desc">\n\t\t\t\t\t\t<span class="product-card__label">Non est magna</span>\n\t\t\t\t\t\t<span class="product-card__price">$38</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="product-recommend__slide">\n\t\t\t\t<a href="#/" class=" product-card" data-pid="3" data-goto="#catalog">\n\t\t\t\t\t<div class="product-card__image-ibg">\n\t\t\t\t\t\t<img class="product-card__img" src="img/catalog/product-img3.jpg" alt="Non est magna">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-card__desc">\n\t\t\t\t\t\t<span class="product-card__label">Non est magna</span>\n\t\t\t\t\t\t<span class="product-card__price">$38</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t\t<div class="product-recommend__slide">\n\t\t\t\t<a href="#/" class=" product-card" data-pid="4" data-goto="#catalog">\n\t\t\t\t\t<div class="product-card__image-ibg">\n\t\t\t\t\t\t<img class="product-card__img" src="img/catalog/product-img4.jpg" alt="Non est magna">\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="product-card__desc">\n\t\t\t\t\t\t<span class="product-card__label">Non est magna</span>\n\t\t\t\t\t\t<span class="product-card__price">$38</span>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class="product-recommend__btn-prev"></div>\n\t\t<div class="product-recommend__btn-next"></div>\n\n\t</div>\n</div>`;
          (e.innerHTML = ""), e.insertAdjacentHTML("beforeend", t);
        }
        Et(),
          (function () {
            const t = document.querySelector(".product__favorites");
            t &&
              t.addEventListener("click", function () {
                t.classList.toggle("_checked");
              });
          })(),
          we(),
          c(),
          y();
      }
      (window.onload = function () {
        document.querySelector(".catalog__products-wrapper") &&
          (Ce(document.querySelector(".catalog__products-wrapper")),
          document.addEventListener("click", function (t) {
            const e = t.target.closest(".product-card");
            if (e) {
              let t = e.dataset.pid;
              (window.location.hash = `product-${t}`), Te(t);
            }
          }),
          document.querySelectorAll(".product-card").forEach((t) => {
            let e = t.dataset.pid;
            location.hash.replace("#", "") == `product-${e}` && Te(e);
          })),
          document.querySelector(".catalog__products-inner") &&
            Ce(document.querySelector(".catalog__products-inner"));
      }),
        (function () {
          let t = document.querySelectorAll(".menu__link"),
            e = new URL(document.location.href).pathname;
          for (let s = 0; s < t.length; s++) {
            let i = t[s].getAttribute("href");
            -1 != e.indexOf(i) && t[s].classList.add("_active-link");
          }
        })(),
        (window.FLS = !0),
        (function (t) {
          let e = new Image();
          (e.onload = e.onerror =
            function () {
              t(2 == e.height);
            }),
            (e.src =
              "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA");
        })(function (t) {
          let e = !0 === t ? "webp" : "no-webp";
          document.documentElement.classList.add(e);
        }),
        e.any()
          ? document.documentElement.classList.add("touch")
          : document.documentElement.classList.add("no-touch"),
        window.addEventListener("load", function () {
          setTimeout(function () {
            document.documentElement.classList.add("loaded");
          }, 200);
        }),
        (function () {
          let t = document.querySelector(".icon-menu");
          t &&
            t.addEventListener("click", function (t) {
              l &&
                (r(), document.documentElement.classList.toggle("menu-open"));
            });
        })(),
        (function () {
          if (
            document.querySelectorAll("[data-fullscreen]").length &&
            e.any()
          ) {
            function t() {
              let t = 0.01 * window.innerHeight;
              document.documentElement.style.setProperty("--vh", `${t}px`);
            }
            window.addEventListener("resize", t), t();
          }
        })(),
        (function () {
          const t = document.querySelectorAll("[data-spollers]");
          if (t.length > 0) {
            const e = Array.from(t).filter(function (t, e, s) {
              return !t.dataset.spollers.split(",")[0];
            });
            e.length && n(e);
            let s = p(t, "spollers");
            function n(t, e = !1) {
              t.forEach((t) => {
                (t = e ? t.item : t),
                  e.matches || !e
                    ? (t.classList.add("_spoller-init"),
                      l(t),
                      t.addEventListener("click", r))
                    : (t.classList.remove("_spoller-init"),
                      l(t, !1),
                      t.removeEventListener("click", r));
              });
            }
            function l(t, e = !0) {
              const s = t.querySelectorAll("[data-spoller]");
              s.length > 0 &&
                s.forEach((t) => {
                  e
                    ? (t.removeAttribute("tabindex"),
                      t.classList.contains("_spoller-active") ||
                        (t.nextElementSibling.hidden = !0))
                    : (t.setAttribute("tabindex", "-1"),
                      (t.nextElementSibling.hidden = !1));
                });
            }
            function r(t) {
              const e = t.target;
              if (e.closest("[data-spoller]")) {
                const s = e.closest("[data-spoller]"),
                  i = s.closest("[data-spollers]"),
                  n = !!i.hasAttribute("data-one-spoller");
                i.querySelectorAll("._slide").length ||
                  (n && !s.classList.contains("_spoller-active") && o(i),
                  s.classList.toggle("_spoller-active"),
                  a(s.nextElementSibling, 500)),
                  t.preventDefault();
              }
            }
            function o(t) {
              const e = t.querySelector("[data-spoller]._spoller-active");
              e &&
                (e.classList.remove("_spoller-active"),
                i(e.nextElementSibling, 500));
            }
            s &&
              s.length &&
              s.forEach((t) => {
                t.matchMedia.addEventListener("change", function () {
                  n(t.itemsArray, t.matchMedia);
                }),
                  n(t.itemsArray, t.matchMedia);
              });
          }
        })(),
        c(),
        document.addEventListener("click", function (t) {
          let e = t.target;
          if (e.closest(".quantity__button")) {
            let t = parseInt(
              e.closest(".quantity").querySelector("input").value
            );
            e.classList.contains("quantity__button_plus")
              ? t++
              : (--t, t < 1 && (t = 1)),
              (e.closest(".quantity").querySelector("input").value = t);
          }
        }),
        y(),
        (function () {
          function t(t) {
            if ("click" === t.type) {
              const e = t.target;
              if (e.closest("[data-goto]")) {
                const s = e.closest("[data-goto]"),
                  i = s.dataset.goto ? s.dataset.goto : "",
                  n = !!s.hasAttribute("data-goto-header"),
                  a = s.dataset.gotoSpeed ? s.dataset.gotoSpeed : "500";
                g(i, n, a), t.preventDefault();
              }
            } else if ("watcherCallback" === t.type && t.detail) {
              const e = t.detail.entry,
                s = e.target;
              if ("navigator" === s.dataset.watch) {
                const t = s.id,
                  i =
                    (document.querySelector("[data-goto]._navigator-active"),
                    document.querySelector(`[data-goto="${t}"]`));
                e.isIntersecting
                  ? i && i.classList.add("_navigator-active")
                  : i && i.classList.remove("_navigator-active");
              }
            }
          }
          document.addEventListener("click", t),
            document.addEventListener("watcherCallback", t);
        })(),
        (function () {
          _t = !0;
          const t = document.querySelector("header.header"),
            e = t.hasAttribute("data-scroll-show"),
            s = t.dataset.scrollShow ? t.dataset.scrollShow : 500,
            i = t.dataset.scroll ? t.dataset.scroll : 1;
          let n,
            a = 0;
          document.addEventListener("windowScroll", function (l) {
            const r = window.scrollY;
            clearTimeout(n),
              r >= i
                ? (!t.classList.contains("_header-scroll") &&
                    t.classList.add("_header-scroll"),
                  e &&
                    (r > a
                      ? t.classList.contains("_header-show") &&
                        t.classList.remove("_header-show")
                      : !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show"),
                    (n = setTimeout(() => {
                      !t.classList.contains("_header-show") &&
                        t.classList.add("_header-show");
                    }, s))))
                : (t.classList.contains("_header-scroll") &&
                    t.classList.remove("_header-scroll"),
                  e &&
                    t.classList.contains("_header-show") &&
                    t.classList.remove("_header-show")),
              (a = r <= 0 ? 0 : r);
          });
        })();
    })();
})();
