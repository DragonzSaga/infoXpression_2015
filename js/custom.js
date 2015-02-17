! function(k, h, l) {
    var b = window.matchMedia;
    "undefined" != typeof module && module.exports ? module.exports = l(b) : "function" == typeof define && define.amd ? define(function() {
        return h[k] = l(b)
    }) : h[k] = l(b)
}("enquire", this, function(k) {
    function h(a, g) {
        var c, b = 0,
            d = a.length;
        for (b; d > b && (c = g(a[b], b), !1 !== c); b++);
    }

    function l(a) {
        this.options = a;
        !a.deferSetup && this.setup()
    }

    function b(a, b) {
        this.query = a;
        this.isUnconditional = b;
        this.handlers = [];
        this.mql = k(a);
        var c = this;
        this.listener = function(a) {
            c.mql = a;
            c.assess()
        };
        this.mql.addListener(this.listener)
    }

    function e() {
        if (!k) throw Error("matchMedia not present, legacy browsers require a polyfill");
        this.queries = {};
        this.browserIsIncapable = !k("only all").matches
    }
    return l.prototype = {
            setup: function() {
                this.options.setup && this.options.setup();
                this.initialised = !0
            },
            on: function() {
                !this.initialised && this.setup();
                this.options.match && this.options.match()
            },
            off: function() {
                this.options.unmatch && this.options.unmatch()
            },
            destroy: function() {
                this.options.destroy ? this.options.destroy() : this.off()
            },
            equals: function(a) {
                return this.options ===
                    a || this.options.match === a
            }
        }, b.prototype = {
            addHandler: function(a) {
                a = new l(a);
                this.handlers.push(a);
                this.matches() && a.on()
            },
            removeHandler: function(a) {
                var b = this.handlers;
                h(b, function(c, e) {
                    return c.equals(a) ? (c.destroy(), !b.splice(e, 1)) : void 0
                })
            },
            matches: function() {
                return this.mql.matches || this.isUnconditional
            },
            clear: function() {
                h(this.handlers, function(a) {
                    a.destroy()
                });
                this.mql.removeListener(this.listener);
                this.handlers.length = 0
            },
            assess: function() {
                var a = this.matches() ? "on" : "off";
                h(this.handlers, function(b) {
                    b[a]()
                })
            }
        },
        e.prototype = {
            register: function(a, g, c) {
                var e = this.queries;
                c = c && this.browserIsIncapable;
                return e[a] || (e[a] = new b(a, c)), "function" == typeof g && (g = {
                    match: g
                }), "[object Array]" === Object.prototype.toString.apply(g) || (g = [g]), h(g, function(b) {
                    "function" == typeof b && (b = {
                        match: b
                    });
                    e[a].addHandler(b)
                }), this
            },
            unregister: function(a, b) {
                var c = this.queries[a];
                return c && (b ? c.removeHandler(b) : (c.clear(), delete this.queries[a])), this
            }
        }, new e
});
$(document).ready(function() {
    function k() {
        $(".testimonial-people").removeClass("testimonial-active");
        $(this).addClass("testimonial-active");
        $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(this).data("testimonial"));
        $(".testimonials-wrapper .testimonial-quirk-content p.testimonial-quirk").html($(this).data("quirk"));
        currentTestimonialSelector = $(this).attr("id");
        var f;
        for (f = 1; 6 >= f; f++) $(this).attr("id") == "tp-" + f || $(this).attr("id") == "tp-" + (f + 6) ? $(".testimonial-callout-box").addClass("arrow-pos-" +
            f) : $(".testimonial-callout-box").removeClass("arrow-pos-" + f);
        for (f = 1; 12 >= f; f++) $(this).attr("id") == "tp-" + f ? $(".testimonial-callout-box").addClass("callout-bg-" + f) : $(".testimonial-callout-box").removeClass("callout-bg-" + f)
    }
    controller = new ScrollMagic;
    Modernizr.csscalc ? $("body").addClass("css-calc").removeClass("no-css-calc") : $("body").addClass("no-css-calc").removeClass("css-calc");
    currentTestimonialSelector = $(".testimonial-active").attr("id");
    $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-active").data("testimonial"));
    $(".testimonials-wrapper .testimonial-quirk-content p.testimonial-quirk").html($(".testimonial-active").data("quirk"));
    $(".testimonials-wrapper .testimonial-people-wrapper .testimonial-people").hover(k);
    tt_width = $(window).width();
    $(window).resize(function() {
        tt_width = $(window).width()
    });
    ttslider = $(".testimonial-people-section").bxSlider({
        slideWidth: tt_width / 6,
        adaptiveHeight: !0,
        minSlides: 1,
        maxSlides: 6,
        moveSlides: 6,
        controls: !0,
        pager: !1,
        easing: "linear",
        infiniteLoop: !1,
        hideControlOnEnd: !0,
        slideMargin: 0
    });
    enquire.register("(min-width:481px)", {
        setup: function() {},
        match: function() {
            $(".testimonial-people-wrapper .bx-wrapper .bx-prev").click(function() {
                $(".testimonial-people").removeClass("testimonial-active");
                $(".testimonial-people#tp-1").addClass("testimonial-active");
                $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-people#tp-1").data("testimonial"));
                for (i = 1; 6 >= i; i++) $(".testimonial-callout-box").removeClass("arrow-pos-" + i), $(".testimonial-callout-box").removeClass("callout-bg-" +
                    i), $(".testimonial-callout-box").removeClass("callout-bg-" + (i + 6));
                $(".testimonial-callout-box").addClass("arrow-pos-1 callout-bg-1")
            });
            $(".testimonial-people-wrapper .bx-wrapper .bx-next").click(function() {
                $(".testimonial-people").removeClass("testimonial-active");
                $(".testimonial-people#tp-7").addClass("testimonial-active");
                $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-people#tp-7").data("testimonial"));
                for (i = 1; 6 >= i; i++) $(".testimonial-callout-box").removeClass("arrow-pos-" +
                    i);
                $(".testimonial-callout-box").addClass("arrow-pos-1 callout-bg-7")
            })
        },
        unmatch: function() {},
        deferSetup: !0,
        destroy: function() {}
    });
    if ($("html").hasClass("mobile")) $("html").hasClass("mobile") && ($("body").addClass("bms-mobile"), $("body.bms-mobile").css("min-height", "100%"), gallery_slider = $(".images-list-in-modal").bxSlider({}), $(function() {
            $(".images-list-in-modal img").each(function() {
                $(this).lazyload({
                    event: "load_images",
                    container: $(".images-list-in-modal"),
                    placeholder: "images/gallery-big-loader.gif"
                })
            })
        }),
        $(".images-list-modal").on("shown.bs.modal", function() {
            $(".images-list-in-modal img").each(function() {
                $(this).trigger("load_images")
            });
            gallery_slider.reloadSlider({
                slideWidth: tt_width - tt_width / 10,
                minSlides: 1,
                maxSlides: 1,
                moveSlides: 1,
                controls: !0,
                pager: !1,
                easing: "linear",
                hideControlOnEnd: !0
            })
        }), $(".modal-gallery a").click(function() {
            setTimeout(function() {}, 300)
        }), adob_content_slider = $(".mobile-timeline-content").bxSlider({
            adaptiveHeight: !1,
            minSlides: 1,
            maxSlides: 1,
            moveSlides: 1,
            controls: !0,
            pager: !0,
            easing: "linear",
            infiniteLoop: !1,
            hideControlOnEnd: !0,
            slideMargin: 0,
            pagerCustom: "#timeline-pager",
            onSlideBefore: function() {
                var a = adob_content_slider.getCurrentSlide();
                0 == a ? ($(".bms-mobile .mobile-timeline").css("background-color", "#C43A2F"), $(".timeline-item-mobile").css("background-color", "#C43A2F")) : 1 == a ? ($(".bms-mobile .mobile-timeline").css("background-color", "#3CAFD0"), $(".timeline-item-mobile").css("background-color", "#3CAFD0")) : 2 == a ? ($(".bms-mobile .mobile-timeline").css("background-color", "#FDBB50"), $(".timeline-item-mobile").css("background-color",
                    "#FDBB50")) : 3 == a ? ($(".bms-mobile .mobile-timeline").css("background-color", "#F26F70"), $(".timeline-item-mobile").css("background-color", "#F26F70")) : 4 == a ? ($(".bms-mobile .mobile-timeline").css("background-color", "#81BC5D"), $(".timeline-item-mobile").css("background-color", "#81BC5D")) : 5 == a && ($(".bms-mobile .mobile-timeline").css("background-color", "#8D7AB8"), $(".timeline-item-mobile").css("background-color", "#8D7AB8"))
            },
            onSlideNext: function() {
                adob_slider.goToNextSlide()
            },
            onSlidePrev: function() {
                adob_slider.goToPrevSlide()
            }
        }),
        enquire.register("(max-width:480px)", {
            setup: function() {
                $("body").addClass("max480").removeClass("min480")
            },
            match: function() {
                $("body").addClass("max480").removeClass("min480")
            },
            unmatch: function() {},
            deferSetup: !0,
            destroy: function() {}
        }), enquire.register("(min-width:481px)", {
            setup: function() {
                $("body").addClass("min480").removeClass("max480")
            },
            match: function() {
                $("body").addClass("min480").removeClass("max480")
            },
            unmatch: function() {},
            deferSetup: !0
        }), enquire.register("(min-width:481px) and (orientation: portrait)", {
            setup: function() {
                $("body").addClass("max480").removeClass("min480")
            },
            match: function() {
                $("body").addClass("max480").removeClass("min480")
            },
            unmatch: function() {
                $("body").addClass("min480").removeClass("max480")
            },
            deferSetup: !0
        }), adob_slider = $(".mobile-circular-timeline").bxSlider({}), slider = $("#sg-row-1").bxSlider({}), $(window).bind("load resize", function() {
            tt_width = $(window).width();
            $(".testimonial-people").removeClass("testimonial-active");
            $("#tp-1").addClass("testimonial-active");
            for (i = 1; 12 >= i; i++) $(".testimonial-callout-box").removeClass("callout-bg-" +
                i);
            for (i = 1; 6 >= i; i++) $(".testimonial-callout-box").removeClass("arrow-pos-" + i);
            var a = $(".testimonial-active").data("testimonial");
            $(".testimonial-main").html(a);
            a = $(".testimonial-active").data("quirk");
            $(".testimonial-quirk").html(a);
            $("body").hasClass("max480") ? (stat_slider_settings = {
                    adaptiveHeight: !0,
                    minSlides: 1,
                    maxSlides: 3,
                    moveSlides: 1,
                    controls: !0,
                    pager: !1,
                    easing: "linear",
                    infiniteLoop: !1,
                    hideControlOnEnd: !0,
                    slideMargin: 0
                }, slider.reloadSlider(stat_slider_settings), a = {
                    slideWidth: $(window).width() /
                        2,
                    minSlides: 1,
                    maxSlides: 1,
                    moveSlides: 1,
                    pager: !1,
                    easing: "linear",
                    controls: !1,
                    infiniteLoop: !1,
                    hideControlOnEnd: !0,
                    slideMargin: 0
                }, adob_slider.reloadSlider(a), $(".bms-mobile .mobile-circular-timeline .timeline-item-mobile").each(function(a) {
                    $(this).on("click", function() {
                        adob_slider.goToSlide(a);
                        console.log(a)
                    })
                }), $(".testimonial-callout-box").addClass("callout-bg-1"), ttslider.reloadSlider({
                    slideWidth: tt_width / 3,
                    minSlides: 1,
                    maxSlides: 1,
                    moveSlides: 1,
                    pager: !1,
                    infiniteLoop: !0,
                    hideControlOnEnd: !0,
                    onSlideNext: function(a) {
                        $(".testimonial-people-section .testimonial-people").each(function() {
                            $(this).hasClass("testimonial-active") &&
                                $(this).removeClass("testimonial-active")
                        });
                        a.addClass("testimonial-active");
                        $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-active").data("testimonial"));
                        for (i = 1; 12 >= i; i++) $(".testimonial-active").attr("id") == "tp-" + i ? $(".testimonial-callout-box").addClass("callout-bg-" + i) : $(".testimonial-callout-box").removeClass("callout-bg-" + i)
                    },
                    onSlidePrev: function(a) {
                        $(".testimonial-people-section .testimonial-people").each(function() {
                            $(this).hasClass("testimonial-active") &&
                                $(this).removeClass("testimonial-active")
                        });
                        a.addClass("testimonial-active");
                        $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-active").data("testimonial"));
                        for (i = 1; 12 >= i; i++) $(".testimonial-active").attr("id") == "tp-" + i ? $(".testimonial-callout-box").addClass("callout-bg-" + i) : $(".testimonial-callout-box").removeClass("callout-bg-" + i)
                    }
                }), $(".testimonials-wrapper .testimonial-people-wrapper .testimonial-people").unbind("mouseenter mouseleave")) : $("body").hasClass("min480") &&
                (setTimeout(function() {
                    slider.destroySlider()
                }, 10), a = {
                    slideWidth: $(window).width() / 6,
                    minSlides: 6,
                    maxSlides: 6,
                    moveSlides: 6,
                    pager: !1,
                    easing: "linear",
                    controls: !1,
                    infiniteLoop: !1,
                    hideControlOnEnd: !0,
                    slideMargin: 0
                }, adob_slider.reloadSlider(a), $(".testimonial-callout-box").addClass("arrow-pos-1 callout-bg-1"), ttslider.reloadSlider({
                    slideWidth: (tt_width - 60) / 6 + "px",
                    minSlides: 1,
                    maxSlides: 6,
                    moveSlides: 6,
                    pager: !1,
                    infiniteLoop: !1,
                    hideControlOnEnd: !0,
                    onSlideNext: function() {
                        $(".testimonial-people").removeClass("testimonial-active");
                        $(".testimonial-people#tp-7").addClass("testimonial-active");
                        $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-people#tp-7").data("testimonial"));
                        for (i = 1; 6 >= i; i++) $(".testimonial-callout-box").removeClass("arrow-pos-" + i);
                        $(".testimonial-callout-box").addClass("arrow-pos-1 callout-bg-7")
                    },
                    onSlidePrev: function() {
                        $(".testimonial-people").removeClass("testimonial-active");
                        $(".testimonial-people#tp-1").addClass("testimonial-active");
                        $(".testimonials-wrapper .testimonial-content p.testimonial-main").html($(".testimonial-people#tp-1").data("testimonial"));
                        for (i = 1; 6 >= i; i++) $(".testimonial-callout-box").removeClass("arrow-pos-" + i), $(".testimonial-callout-box").removeClass("callout-bg-" + i), $(".testimonial-callout-box").removeClass("callout-bg-" + (i + 6));
                        $(".testimonial-callout-box").addClass("arrow-pos-1 callout-bg-1")
                    }
                }), $(".testimonials-wrapper .testimonial-people-wrapper .testimonial-people").bind("mouseenter mouseleave"), $(".testimonials-wrapper .testimonial-people-wrapper .testimonial-people").hover(k))
        }));
    else {
        var h = function() {
                $(".text-on-image-wrapper p:first-child").hide().next(".text-on-image-wrapper p").show().end().appendTo(".text-on-image-wrapper")
            },
            l = function() {
                $(".images-list img:first-child").show().next(".images-list img").hide().end().appendTo(".images-list")
            };
        $(".timeline-wrapper").css("height", $(window).height());
        numItems = $(".timeline-item").length;
        start = -90;
        step = Math.PI / numItems;
        $(".timeline-item").each(function(f) {
            radius = 500;
            tmpTop = $(".timeline-line").height() / 2 + radius * Math.sin(start) - $(this).height() / 2;
            tmpLeft = $(".timeline-line").width() / 2 + radius * Math.cos(start) - $(this).width() / 2;
            start += step;
            $(this).css("top", tmpTop);
            $(this).css("left",
                tmpLeft)
        });
        circle_distance = 2 * Math.PI * radius / numItems;
        circle_rotation_degs = 26 * circle_distance / 448;
        timeline_elem_top = [];
        timeline_elem_left = [];
        timeline_content = $(".timeline-content").length;
        $(".timeline-item").each(function(f) {
            timeline_elem_top.push($(this).css("top"));
            timeline_elem_left.push($(this).css("left"));
            tl_initial_rotate = -circle_rotation_degs * $(this).index();
            $(this).css({
                "-webkit-transform": "rotate(" + -(tl_initial_rotate + circle_rotation_degs - 4) + "deg)",
                "-moz-transform": "rotate(" + -(tl_initial_rotate +
                    circle_rotation_degs - 4) + "deg)",
                "-o-transform": "rotate(" + -(tl_initial_rotate + circle_rotation_degs - 4) + "deg)",
                transform: "rotate(" + -(tl_initial_rotate + circle_rotation_degs - 4) + "deg)"
            })
        });
        $("#ti-2").addClass("next-1");
        $(".timeline-item").each(function(f) {
            $(this).on("click", function() {
                $(".timeline-item").removeClass("active");
                $(this).addClass("active");
                var a = $(this).index(),
                    a = -circle_rotation_degs * a;
                $(".timeline-line").css({
                    "-webkit-transform": "rotate(" + (a + circle_rotation_degs - 3) + "deg)",
                    "-moz-transform": "rotate(" +
                        (a + circle_rotation_degs - 3) + "deg)",
                    "-o-transform": "rotate(" + (a + circle_rotation_degs - 3) + "deg)",
                    transform: "rotate(" + (a + circle_rotation_degs - 3) + "deg)"
                });
                $(".timeline-item.active").css({
                    "-webkit-transform": "rotate(" + -(a + circle_rotation_degs - 4) + "deg)",
                    "-moz-transform": "rotate(" + -(a + circle_rotation_degs - 4) + "deg)",
                    "-o-transform": "rotate(" + -(a + circle_rotation_degs - 4) + "deg)",
                    transform: "rotate(" + -(a + circle_rotation_degs - 4) + "deg)"
                });
                $(".timeline-content").removeClass("popin").addClass("popout");
                $("#tc-" + f).removeClass("popout").addClass("popin");
                $(".timeline-item").prev().removeClass("prev-1");
                $(".timeline-item").next().removeClass("next-1");
                $(".timeline-item.active").prev().addClass("prev-1");
                $(".timeline-item.active").next().addClass("next-1");
                $(".timeline-radius").removeClass("prev-1, next-1");
                $("#ti-1").hasClass("active") ? ($(".circular-timeline").css({"background":"#C43A2F"}), $(".timeline-item").css("background-color", "#C43A2F")) : $("#ti-2").hasClass("active") ? ($(".circular-timeline").css({"background":"url(images/event-bg/ti-2.png) #3CAFD0 right center no-repeat"}), $(".timeline-item").css("background-color",
                    "#3CAFD0")) : $("#ti-3").hasClass("active") ? ($(".circular-timeline").css({"background":"url(images/event-bg/ti-3.png) #FDBB50 right center no-repeat"}), $(".timeline-item").css("background-color", "#FDBB50")) : $("#ti-4").hasClass("active") ? ($(".circular-timeline").css({"background":"url(images/event-bg/ti-4.png) #F26F70 right center no-repeat"}), $(".timeline-item").css("background-color", "#F26F70")) : $("#ti-5").hasClass("active") ? ($(".circular-timeline").css({"background":"url(images/event-bg/ti-5.png) #81BC5D right center no-repeat"}), $(".timeline-item").css("background-color", "#81BC5D")) : $("#ti-6").hasClass("active") && ($(".circular-timeline").css({"background":"url(images/event-bg/ti-6.png) #8D7AB8 right center no-repeat"}), $(".timeline-item").css("background-color", "#8D7AB8"))
            })
        });
        var b = new TimelineLite,
            e = TweenMax.from("#ti-2", 5, {
                delay: 5,
                onStart: function() {
                    $("#ti-2").hasClass("active") || $("#ti-2").trigger("click")
                },
                onReverseComplete: function() {
                    $("#ti-1").hasClass("active") || $("#ti-1").trigger("click")
                }
            }),
            a = TweenMax.from("#ti-3", 5, {
                delay: 10,
                onStart: function() {
                    $("#ti-3").trigger("click")
                },
                onReverseComplete: function() {
                    $("#ti-2").trigger("click")
                }
            }),
            g = TweenMax.from("#ti-4", 5, {
                delay: 15,
                onStart: function() {
                    $("#ti-4").trigger("click")
                },
                onReverseComplete: function() {
                    $("#ti-3").trigger("click")
                }
            }),
            c = TweenMax.from("#ti-5", 5, {
                delay: 20,
                onStart: function() {
                    $("#ti-5").trigger("click")
                },
                onReverseComplete: function() {
                    $("#ti-4").trigger("click")
                }
            }),
            p = TweenMax.from("#ti-6", 5, {
                delay: 25,
                onStart: function() {
                    $("#ti-6").trigger("click")
                },
                onReverseComplete: function() {
                    $("#ti-5").trigger("click")
                }
            });
        b.add([e, a, g, c, p]);
        var d = (new ScrollScene({
            triggerElement: ".circular-timeline",
            duration: 4E3,
            triggerHook: "onLeave"
        })).setPin(".circular-timeline").setTween(b).addTo(controller);
        d.on("enter", function(a) {
            $(".circular-timeline").addClass("keyActive")
        });
        d.on("leave", function(a) {
            $(".circular-timeline").removeClass("keyActive")
        });
        d.on("progress", function(a) {
            d.progress();
            $(window).keydown(function(a) {
                if (40 == a.keyCode) {
                    console.log("down");
                    if ($(".keyActive #ti-1").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-2").css("top"))
                    }, 5), !1;
                    if ($(".keyActive #ti-2").hasClass("active")) return $("html, body").animate({
                            scrollTop: parseInt($("#ti-anchor-3").css("top"))
                        },
                        5), !1;
                    if ($(".keyActive #ti-3").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-4").css("top"))
                    }, 5), !1;
                    if ($(".keyActive #ti-4").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-5").css("top"))
                    }, 5), !1;
                    if ($(".keyActive #ti-5").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-6").css("top"))
                    }, 5), !1
                } else if (38 == a.keyCode) {
                    console.log("up");
                    if ($(".keyActive #ti-2").hasClass("active")) return $("html, body").animate({
                            scrollTop: parseInt($("#ti-anchor-1").css("top"))
                        },
                        5), !1;
                    if ($(".keyActive #ti-3").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-2").css("top"))
                    }, 5), !1;
                    if ($(".keyActive #ti-4").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-3").css("top"))
                    }, 5), !1;
                    if ($(".keyActive #ti-5").hasClass("active")) return $("html, body").animate({
                        scrollTop: parseInt($("#ti-anchor-4").css("top"))
                    }, 5), !1;
                    if ($(".keyActive #ti-6").hasClass("active")) return $("html, body").animate({
                            scrollTop: parseInt($("#ti-anchor-5").css("top"))
                        },
                        5), !1
                }
            })
        });
        $(function() {
            $(".timeline-item > a").click(function() {
                if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") && location.hostname == this.hostname) {
                    var a = $(this.hash),
                        a = a.length ? a : $("[name=" + this.hash.slice(1) + "]");
                    if (a.length) return $("html,body").animate({
                        scrollTop: a.offset().top
                    }, 5), !1
                }
            })
        });
        b = d.scrollOffset();
        e = d.scrollOffset() + .2 * d.duration();
        a = d.scrollOffset() + .4 * d.duration();
        g = d.scrollOffset() + .2 * d.duration() * 3;
        c = d.scrollOffset() + .8 * d.duration();
        p = d.scrollOffset() + 1 *
            d.duration();
        $("#ti-anchor-1").css("top", b + "px");
        $("#ti-anchor-2").css("top", e + "px");
        $("#ti-anchor-3").css("top", a + "px");
        $("#ti-anchor-4").css("top", g + "px");
        $("#ti-anchor-5").css("top", c + "px");
        $("#ti-anchor-6").css("top", p + "px");
        var m = "";
        $(window).load(function() {
            $(".images-list img").css("visibility", "visible")
        });
        var n = "";
        $(window).load(function() {
            $(".text-on-image-wrapper p").css("textWall", "visible")
        });
        clearInterval(m);
        clearInterval(n);
        $(".image-gallery-wrapper").waypoint(function(a) {
            "down" ===
            a ? (m = setInterval(l, 500), n = setInterval(h, 750)) : (clearInterval(m), clearInterval(n))
        }, {
            offset: "60%"
        }).waypoint(function(a) {
            "up" === a ? (m = setInterval(l, 500), n = setInterval(h, 750)) : (clearInterval(m), clearInterval(n))
        }, {
            offset: "-60%"
        });
        (new ScrollScene({
            triggerElement: ".testimonials-wrapper",
            duration: 500,
            triggerHook: "onLeave"
        })).setPin(".testimonials-wrapper").addTo(controller);
        b = new TimelineLite;
        e = TweenMax.from(".job-type-block", 2.5, {
            css: {
                opacity: 0
            }
        });
        b.add([e]);
        (new ScrollScene({
            triggerElement: ".jc-title-wrapper",
            duration: 300,
            triggerHook: .7
        })).setTween(b).addTo(controller);
        $("#pin-section").css("height", $(window).height());
        b = new TimelineLite;
        e = new TimelineLite;
        (new ScrollScene({
            triggerElement: "#tc-5",
            duration: 1E3,
            triggerHook: "onLeave"
        })).setTween(e).addTo(controller);
        a = (new ScrollScene({
            triggerElement: ".lwp-section-wrapper",
            duration: 750,
            triggerHook: "onLeave",
            tweenChanges: !0
        })).setPin(".lwp-section-wrapper").setTween(b).addTo(controller);
        startPos_lwp_1 = a.scrollOffset();
        startPos_lwp_2 = a.scrollOffset() + .2 * a.duration();
        startPos_lwp_3 = a.scrollOffset() + .4 * a.duration();
        startPos_lwp_4 = a.scrollOffset() + .2 * a.duration() * 3;
        startPos_lwp_5 = a.scrollOffset() + .8 * a.duration();
        startPos_lwp_6 = a.scrollOffset() + 1 * a.duration();
        $("#lwp-anchor-1").css("top", startPos_lwp_1 + "px");
        $("#lwp-anchor-2").css("top", startPos_lwp_2 + "px");
        $("#lwp-anchor-3").css("top", startPos_lwp_3 + "px");
        $("#lwp-anchor-4").css("top", startPos_lwp_4 + "px");
        $("#lwp-anchor-5").css("top", startPos_lwp_5 + "px");
        $("#lwp-anchor-6").css("top", startPos_lwp_6 + "px");
        e.add([TweenMax.from($("#live-top-left"),
            .2, {
                transform: "translate(-55%,-25%)",
                ease: Quad.easeOut,
                onComplete: function() {}
            }), TweenMax.from($("#live-top-right"), .2, {
            transform: "translate(65%,-10%)",
            ease: Quad.easeOut
        }), TweenMax.from($("#live-bottom-left"), .2, {
            transform: "translate(-25%,75%)",
            ease: Quad.easeOut
        }), TweenMax.from($("#live-bottom-right"), .2, {
            transform: "translate(25%,75%)",
            ease: Quad.easeOut
        })]);
        b.add([TweenMax.from($("#live-section .lwptext-wrapper"), .2, {
                scale: 2,
                ease: Quad.easeOut,
                onStart: function() {
                    $("#live-section .lwptext-wrapper").css("visibility",
                        "visible");
                    $("html,body").animate({
                        scrollTop: $("#lwp-anchor-2").css("top")
                    }, "slow")
                },
                onReverseComplete: function() {
                    $("#live-section .lwptext-wrapper").css("visibility", "hidden")
                }
            }), TweenMax.to($("#live-top-left"), .2, {
                delay: .9,
                transform: "translate(-55%,-25%)",
                ease: Quad.easeOut,
                onStart: function() {
                    $("html,body").animate({
                        scrollTop: $("#lwp-anchor-4").css("top")
                    }, "slow")
                }
            }), TweenMax.to($("#live-top-right"), .2, {
                delay: .9,
                transform: "translate(65%,-10%)",
                ease: Quad.easeOut
            }), TweenMax.to($("#live-bottom-left"),
                .2, {
                    delay: .9,
                    transform: "translate(-25%,75%)",
                    ease: Quad.easeOut
                }), TweenMax.to($("#live-bottom-right"), .2, {
                delay: .9,
                transform: "translate(25%,75%)",
                ease: Quad.easeOut
            }), TweenMax.to($("#live-section"), .2, {
                delay: 1.1,
                css: {
                    opacity: "0"
                },
                ease: Quad.easeOut,
                onStart: function() {
                    $("#live-section .lwptext-wrapper").css("visibility", "hidden")
                },
                onComplete: function() {
                    $("#work-section").css("z-index", "3")
                },
                onReverseComplete: function() {
                    $("#live-section .lwptext-wrapper").css("visibility", "visible");
                    $("#work-section").css("z-index",
                        "")
                }
            }), TweenMax.to($("#live-section .lwptext-wrapper"), .2, {
                delay: .9,
                scale: 2,
                ease: Quad.easeOut
            }), TweenMax.from($("#work-top-left"), .2, {
                delay: 1.3,
                transform: "translate(-55%,-25%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#work-top-right"), .2, {
                delay: 1.3,
                transform: "translate(65%,-10%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#work-bottom-left"), .2, {
                delay: 1.3,
                transform: "translate(-25%,75%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#work-bottom-right"), .2, {
                delay: 1.3,
                transform: "translate(25%,75%)",
                ease: Quad.easeOut
            }),
            TweenMax.from($("#work-section .lwptext-wrapper"), .2, {
                delay: 1.3,
                scale: 2,
                ease: Quad.easeOut,
                onStart: function() {
                    $("#work-section .lwptext-wrapper").css("visibility", "visible")
                },
                onReverseComplete: function() {
                    $("#work-section .lwptext-wrapper").css("visibility", "hidden")
                }
            }), TweenMax.to($("#work-top-left"), .2, {
                delay: 2,
                transform: "translate(-55%,-25%)",
                ease: Quad.easeOut,
                onStart: function() {
                    $("html,body").animate({
                        scrollTop: $("#lwp-anchor-6").css("top")
                    }, "slow")
                }
            }), TweenMax.to($("#work-top-right"), .2, {
                delay: 2,
                transform: "translate(65%,-10%)",
                ease: Quad.easeOut
            }), TweenMax.to($("#work-bottom-left"), .2, {
                delay: 2,
                transform: "translate(-25%,75%)",
                ease: Quad.easeOut
            }), TweenMax.to($("#work-bottom-right"), .2, {
                delay: 2,
                transform: "translate(25%,75%)",
                ease: Quad.easeOut
            }), TweenMax.to($("#work-section"), .2, {
                delay: 2.2,
                css: {
                    opacity: "0"
                },
                ease: Quad.easeOut,
                onStart: function() {
                    $("#work-section .lwptext-wrapper").css("visibility", "hidden")
                },
                onComplete: function() {
                    $("#play-section").css("z-index", "3")
                },
                onReverseComplete: function() {
                    $("#work-section .lwptext-wrapper").css("visibility",
                        "visible");
                    $("#play-section").css("z-index", "")
                }
            }), TweenMax.to($("#work-section .lwptext-wrapper"), .2, {
                delay: 2,
                scale: 2,
                ease: Quad.easeOut
            }), TweenMax.from($("#play-top-left"), .2, {
                delay: 2.4,
                transform: "translate(-55%,-25%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#play-top-right"), .2, {
                delay: 2.4,
                transform: "translate(65%,-10%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#play-bottom-left"), .2, {
                delay: 2.4,
                transform: "translate(-25%,75%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#play-bottom-right"), .2, {
                delay: 2.4,
                transform: "translate(25%,75%)",
                ease: Quad.easeOut
            }), TweenMax.from($("#play-section .lwptext-wrapper"), .2, {
                delay: 2.4,
                scale: 2,
                ease: Quad.easeOut,
                onStart: function() {
                    $("#play-section .lwptext-wrapper").css("visibility", "visible")
                },
                onReverseComplete: function() {
                    $("#play-section .lwptext-wrapper").css("visibility", "hidden")
                }
            }), TweenMax.to($("#play-section"), .2, {
                delay: 2.8,
                css: {
                    opacity: "1"
                },
                ease: Quad.easeOut
            }), TweenMax.to($(".live-extra"), .2, {
                opacity: 1,
                ease: Quad.easeOut
            }), TweenMax.to($(".work-extra"), .2, {
                delay: 1.3,
                opacity: 1,
                ease: Quad.easeOut
            }),
            TweenMax.to($(".play-extra"), .2, {
                delay: 2.5,
                opacity: 1,
                ease: Quad.easeOut
            }), TweenMax.to($(".live-extra"), .2, {
                delay: .9,
                opacity: 0,
                ease: Quad.easeOut
            }), TweenMax.to($(".work-extra"), .2, {
                delay: 2,
                opacity: 0,
                ease: Quad.easeOut
            })
        ]);
        $(".stat-content").fadeOut();
        $(".stats-grid-box").waypoint(function(a) {
            "down" === a && ($(this).addClass("anim-in-view"), $(".stat-content").delay(1E3).fadeIn())
        }, {
            offset: "60%"
        }).waypoint(function(a) {
            "up" === a && $(this).removeClass("anim-in-view")
        }, {
            offset: "80%"
        })
    }
    var q;
    $(window).bind("scroll",
        function() {
            var a = $(window).scrollTop();
            a > q && $(".scroll-top-wrapper").fadeOut();
            a < q && "ontouchstart" in window && $(".scroll-top-wrapper").fadeIn();
            q = a;
            0 === a && $(".scroll-top-wrapper").fadeOut()
        });
    $(".scroll-top-wrapper").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800)
    });
    svgeezy.init(!1, "png");
    $(".testimonial-arrow").css("font-size", Math.ceil(.035 * $(window).width()) + "px");
    $(window).bind("load resize", function() {
        window.viewportUnitsBuggyfill.init();
        window.viewportUnitsBuggyfill.refresh();
        $(".testimonial-arrow").css("font-size",
            Math.ceil(.035 * $(window).width()) + "px");
        $(".no-css-calc .testimonial-arrow").css("width", tt_width - 60)
    });
    Modernizr.inlinesvg ? ($(".bu_png_fallback").css("display", "none"), $("#bu_svg").css("display", "block")) : ($(".bu_png_fallback").css("display", "block"), $("#bu_svg").css("display", "none"));
    (function() {
        if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
            var a = document.createElement("style");
            a.appendChild(document.createTextNode("@-ms-viewport{width:auto!important}"));
            document.getElementsByTagName("head")[0].appendChild(a)
        }
    })()
});
