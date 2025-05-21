/**********************************************************
LemonPen JS by openid[disappered] to IREN.

Archived by web.archive.org
**********************************************************/

var CrustClass = {
    create: function () {
        return function () {
            this.initialize.apply(this, arguments)
        }
    },
    extend: function (destination, source) {
        for (var property in source) {
            destination[property] = source[property]
        }
        return destination
    }
};
var CrustBase = CrustClass.create();
CrustBase.prototype = {
    log: function (e) {
        if (window.dump)
            window.dump("\n===========================\n" + (typeof e == "string" ? e : print_r(e, true)));
        return
    },
    cast: function (type) {
        if (document.createEvent) {
            var e = document.getElementById("CRUST-DATA-PROVIDER");
            if (!e) {
                e = document.createElement("CrustDataProvider");
                e.setAttribute("id", "CRUST-DATA-PROVIDER");
                document.body.appendChild(e)
            }
            var evt = document.createEvent("Events");
            evt.initEvent(type, true, false);
            e.dispatchEvent(evt)
        }
    },
    canFillOpenID: function (c) {
        var m,
        b = false;
        if ((m = new RegExp('^https?:\/\/([^.]*)$', 'i').exec(c)))
            b = m[1].length && m[1].indexOf(".") == -1;
        else if (c.length > 0 && c.indexOf(".") == -1)
            b = true;
        return b
    },
    fillOpenID: function (c) {
        return c + ".myid.net"
    },
    hasPriv: function (p) {
        return true
    },
    eventIn: function (e) {
        try {
            var s = CrustEvent.element(e);
            while (true) {
                if (!s || s == document)
                    return false;
                if ((s.id && s.id.indexOf("CRUST-UI-") > -1) || (s.className && s.className.indexOf("CRUST-UI") > -1))
                    return true;
                if (!s.parentNode)
                    return false;
                s = s.parentNode
            }
            return false
        } catch (err) {
            return false
        }
    },
    eventInClass: function (ev, c) {
        if (!ev)
            return false;
        var e = ev.relatedTarget || ev.toElement || ev.srcElement || ev.target || null;
        if (e) {
            try {
                while (true) {
                    if (e == document || e == window)
                        return false;
                    var k = e.className;
                    if (k.length && k.indexOf(c) > -1)
                        return true;
                    if (!e.parentNode)
                        return false;
                    e = e.parentNode
                }
            } catch (err) {
                return false
            }
        }
        return false
    },
    eventInId: function (ev, c) {
        if (!ev)
            return false;
        var e = ev.relatedTarget || ev.toElement || ev.srcElement || ev.target || null;
        if (e) {
            try {
                while (true) {
                    if (e == document || e == window)
                        return false;
                    if (e.id && e.id.indexOf(c) > -1)
                        return true;
                    if (!e.parentNode)
                        return false;
                    e = e.parentNode
                }
            } catch (err) {
                return false
            }
        }
        return false
    },
    msg: function (k) {
        return CrustLocalizer.get(k)
    },
    option: function (k, v) {
        return CrustOption.option(k, v)
    },
    pref: function (k, v) {
        return CrustOption.pref(k, v)
    },
    savePref: function () {
        return CrustOption.savePref()
    },
    localID: function () {
        return CrustUser.localid
    },
    openID: function () {
        return CrustUser.openid
    },
    groups: function () {
        var g = CrustUser.groups,
        a = [];
        for (var i = 0; i < g.length; i++) {
            if (g[i].id == LemonPen.PUBLIC_GROUP || g[i].id == 2)
                continue;
            a.push(g[i])
        }
        return a
    },
    activeGroup: function () {
        var g = this.groups(),
        f = this.pref("ACTIVE_GROUP");
        if (g.length) {
            for (var i = 0; i < g.length; i++)
                if (g[i].id == f)
                    return g[i];
            return g[0]
        }
        return null
    },
    filteredGroup: function () {
        var g = this.groups(),
        f = this.pref("FILTER_GROUP");
        if (g.length) {
            for (var i = 0; i < g.length; i++)
                if (g[i].id == f)
                    return g[i];
            return g[0]
        }
        return null
    },
    getGroup: function (d) {
        var g = this.groups();
        for (var i = 0; i < g.length; i++)
            if (g[i].id == d)
                return g[i];
        return null
    },
    userID: function () {
        return CrustUser.userid
    },
    userName: function () {
        return CrustUser.username
    },
    authorized: function () {
        return CrustUser.is_openid
    },
    listen: function (evt, obj, callback) {
        if (typeof this._listeners == "undefined")
            this._listeners = [];
        this._listeners.push({
            name: evt,
            obj: obj,
            callback: callback
        })
    },
    stopListen: function (evt, obj, callback) {
        if (this._listeners) {
            var l;
            for (var i = 0; i < this._listeners.length; i++) {
                l = this._listeners[i];
                if (l.name == evt && l.obj == obj && l.callback == callback) {
                    this._listeners.splice(i, 1);
                    return
                }
            }
        }
    },
    fire: function (name, data) {
        if (!this._listeners)
            return;
        for (var i = 0; i < this._listeners.length; i++) {
            var l = this._listeners[i];
            if (l.name == name)
                l.obj[l.callback](data)
        }
    }
};
var LemonPen = CrustClass.create();
LemonPen.URL_ROOT = "http://www.lemonpen.com";
LemonPen.URL_BASE = "http://ink.lemonpen.com/cheese";
LemonPen.URL_COOKIE = "/";
LemonPen.URL_PROXY = "";
LemonPen.URL_IMAGE = "http://res.lemonpen.com/themes/default/img";
LemonPen.URL_GET = LemonPen.URL_BASE + "/get";
LemonPen.URL_ADD = LemonPen.URL_BASE + "/insert";
LemonPen.URL_UPDATE = LemonPen.URL_BASE + "/update";
LemonPen.URL_DELETE = LemonPen.URL_BASE + "/delete";
LemonPen.URL_USER = LemonPen.URL_BASE + "/load_user";
LemonPen.URL_LOGIN = LemonPen.URL_ROOT + "/auth/login";
LemonPen.URL_LOGOUT = LemonPen.URL_ROOT + "/auth/logout";
LemonPen.URL_TAG = "http://scrap.lemonpen.com/book/{LOCALID}/{TAG}";
LemonPen.URL_OPTION = LemonPen.URL_BASE + "/option";
LemonPen.URL_SCRAPBOOK = "http://scrap.lemonpen.com/book/{LOCALID}";
LemonPen.URL_CSS = "http://style.lemonpen.com/site/lemonpen_release.css";
LemonPen.URL_EXPORT = LemonPen.URL_ROOT + "/export/blog";
LemonPen.MAX_REPLY_DEPTH = 6;
LemonPen.VERSION = 20071126;
LemonPen.PUBLIC_GROUP = 1;
LemonPen.Pizza = false;
CrustClass.extend(LemonPen.prototype, CrustBase.prototype);
CrustClass.extend(LemonPen.prototype, {
    doc: null,
    request: null,
    lang: "ko",
    parent: null,
    funcs: [],
    types: ["notes", "highlights", "links"],
    notes: [],
    highlights: [],
    links: [],
    wnds: [],
    storedData: "",
    sender: null,
    data: null,
    toolbar: null,
    taker: null,
    docs: [],
    activated: false,
    highlightEnabled: false,
    login: null,
    title: function () {
        return document.title
    },
    location: function () {
        return document.location.href
    },
    initialize: function (doc) {
        this.doc = doc;
        this.parent = doc == document ? doc.body : document.body
    },
    activate: function (option, user, data) {
        if (this.activated) {
            throw ("[AlreadyActivated]");
            return
        }
        var t = this,
        m = this.doc.getElementsByTagName("meta");
        for (var i = 0; i < m.length; i++)
            if (m[i].httpEquiv == "lemonpen" && m[i].content == "no")
                return;
        if (this.location().indexOf("__nocrust__") > -1)
            return;
        this.activated = true;
        CrustEnv.initialize();
        CrustOption.listen("save", this, "saveOption");
        var v;
        if (option) {
            for (var opt in option) {
                v = option[opt];
                this.option(opt, v)
            }
        }
        if (data)
            this.data = data;
        if (user)
            this.onUser(user);
        if (!data) {
            this.request = new CrustRequest();
            if (!CrustUser.logged())
                window.setTimeout(function () {
                    t.loadUser()
                }, 10)
        }
    },
    loadUser: function () {
        this.request.getJSON(LemonPen.URL_USER, "url_request=" + encodeURIComponent(LemonPen.URL_USER) + "&language=" + this.lang, this, "onUser")
    },
    getRequest: function () {
        return this.request
    },
    setUser: function (user) {
        CrustUser.userid = parseInt(user.id);
        CrustUser.openid = user.openid_url;
        CrustUser.is_openid = parseInt(user.is_openid) == 1;
        CrustUser.username = user.name;
        CrustUser.groups = user.groups;
        CrustUser.localid = user.local_id
    },
    applyOption: function (o) {
        return;
        try {
            for (var p in o)
                this.option(p, o[p]);
            if (typeof o.enableToolbar == "boolean")
                this.toggleToolbar(o.enableToolbar);
            if (this.toolbar)
                this.toolbar.applyOption(o)
        } catch (e) {
            this.log(e)
        }
    },
    onUser: function (r) {
        this.setUser(r);
        if (!this.option("allowGuestPost") && !this.authorized()) {
            CrustUI.initialize();
            this.drawUI();
            return
        }
        if (r.option) {
            if (typeof r.option == "string")
                eval("var opt = " + r.option);
            else
                var opt = r.option;
            CrustOption.importPref(opt)
        }
        CrustUI.initialize();
        if (!this.data)
            this.getCrusts();
        else
            this.onCrusts(this.data)
    },
    addHandlers: function () {
        if (this.option("enableHighlight")) {
            CrustEvent.listenEvent(this.doc, "mouseup", this, "onMouseUp");
            CrustEvent.listenEvent(this.doc, "mousedown", this, "onMouseDown")
        }
    },
    onMouseDown: function (e) {
        try {
            if (this.pref("TURNOFF"))
                return;
            e = e || event;
            if (this.eventIn(e))
                return false;
            this.hideTaker(e);
            return false
        } catch (e) {
            this.log(e)
        }
    },
    onMouseUp: function (e) {
        try {
            if (this.pref("TURNOFF"))
                return;
            var t = this;
            e = e || event;
            this.hideTaker();
            if (this.eventIn(e))
                return false;
            if (this.canHighlight()) {
                if (this.highlightEnabled) {
                    var d = CrustRange.serialize();
                    this.sendHighlight(d);
                    CrustElement.removeClass(this.parent, "CRUST_CURSOR_HIGHLIGHT");
                    this.highlightEnabled = false
                } else {
                    var x = CrustEvent.mouseX(e);
                    var y = CrustEvent.mouseY(e);
                    window.setTimeout(function () {
                        if (t.canHighlight()) {
                            t.showTaker(x, y)
                        }
                    }, 0)
                }
            }
            if (this.highlightEnabled) {
                CrustElement.removeClass(this.parent, "CRUST_CURSOR_HIGHLIGHT");
                this.highlightEnabled = false
            }
            return false
        } catch (r) {
            this.log(r)
        }
    },
    highlight: function () {
        if (this.canHighlight()) {
            var d = CrustRange.serialize();
            this.sendHighlight(d);
            CrustElement.removeClass(this.parent, "CRUST_CURSOR_HIGHLIGHT")
        } else {
            this.highlightEnabled = true;
            CrustElement.addClass(this.parent, "CRUST_CURSOR_HIGHLIGHT")
        }
    },
    canHighlight: function () {
        var t = CrustRange.getText().length;
        var b = CrustRange.hasCrust();
        if (b == false && t > 0 && t >= this.option("minHighlightChars") && t <= this.option("maxHighlightChars"))
            return true;
        return false
    },
    hideTaker: function (e) {
        try {
            if (this.option("enableHighlightTaker"))
                this.taker.style.display = "none";
            this.cast("LemonPenSelectionEnd")
        } catch (e) {
            this.log(e)
        }
    },
    showTaker: function (x, y) {
        if (!this.option("allowGuestPost") && !this.authorized())
            return;
        if (CrustRange.hasText() && this.option("enableHighlightTaker")) {
            with (this.taker.style) {
                display = "none";
                left = (x + this.option("cursorPosX")) + "px";
                top = (y - CrustElement.height(this.taker) + this.option("cursorPosY")) + "px";
                display = ""
            }
            this.cast("LemonPenSelectionStart")
        }
    },
    drawUI: function () {
        if (LemonPen.URL_CSS) {
            var s = document.createElement("link");
            s.setAttribute("type", "text/css");
            s.setAttribute("rel", "Stylesheet");
            s.setAttribute("href", LemonPen.URL_CSS);
            document.body.appendChild(s)
        }
        this.drawTaker();
        this.drawToolbar()
    },
    drawTaker: function () {
        try {
            if (this.option("enableHighlightTaker")) {
                var _this = this,
                t = document.createElement("div");
                t.innerHTML = CrustUI.getHtml("taker");
                this.taker = this.parent.appendChild(t.firstChild);
                this.taker.unselectable = "on";
                this.taker.onclick = function () {
                    var d = CrustRange.serialize();
                    this.style.display = "none";
                    _this.sendHighlight(d)
                }
            }
        } catch (e) {
            this.log(e)
        }
    },
    toggleToolbar: function (b) {
        if (this.toolbar)
            this.toolbar[b ? "show" : "hide"]();
        else {
            if (b)
                this.drawToolbar()
        }
    },
    drawToolbar: function () {
        try {
            if (!this.option("allowGuestPost") && !this.authorized() && CrustTrigger) {
                var t = new CrustTrigger(this.parent);
                t.listen("click", this, "showLogin")
            } else if (this.option("enableToolbar") && CrustToolbar) {
                var t = this.toolbar = new CrustToolbar(this.parent);
                t.listen("note", this, "popNote");
                t.listen("expandAll", this, "expandAll");
                t.listen("shrinkAll", this, "shrinkAll");
                t.listen("viewGroup", this, "viewGroup");
                t.listen("viewAll", this, "viewAll");
                t.listen("viewMy", this, "viewMy");
                t.listen("on", this, "turnOn");
                t.listen("off", this, "turnOff");
                t.listen("highlight", this, "highlight");
                t.listen("needLogin", this, "showLogin")
            }
        } catch (e) {
            this.log(e)
        }
    },
    drawCrusts: function (d) {
        try {
            if (!d)
                return;
            var __t = new Date().getTime();
            if (d.notes && d.notes.length) {
                for (var i = 0; i < d.notes.length; i++)
                    this.drawNote(d.notes[i])
            }
            var n = CrustUtil.getClientScroll();
            if (d.highlights && d.highlights.length) {
                for (var i = 0; i < d.highlights.length; i++)
                    this.drawHighlight(d.highlights[i]);
                window.scrollTo(n[0], n[1]);
                CrustRange.clear()
            }
            var t = ((new Date().getTime() - __t)) / 1000.0;
            var cnt = (d.notes ? d.notes.length : 0) + (d.highlights ? d.highlights.length : 0);
            var f = this.pref("FILTER"),
            g = this.pref("FILTER_GROUP");
            this.filterCrusts(f, g);
            if (this.toolbar)
                this.toolbar.filtered(f, g)
        } catch (e) {
            this.log(e)
        }
    },
    filterCrusts: function (f, d) {
        var c = this.crusts(),
        b;
        switch (f) {
        case "my":
            for (var i = 0; i < c.length; i++) {
                b = false;
                if (c[i].g_id || c[i].data.user_id != this.userID())
                    b = true;
                c[i].filtered(b)
            }
            break;
        case "all":
            for (var i = 0; i < c.length; i++)
                c[i].filtered(false);
            break;
        case "group":
            for (var i = 0; i < c.length; i++) {
                b = true;
                if (c[i].g_id) {
                    if (c[i].g_id == d)
                        b = false
                } else if (c[i].data.user_id == this.userID())
                    b = false;
                c[i].filtered(b)
            }
            break
        }
    },
    crusts: function () {
        var r = [],
        n = this.notes,
        h = this.highlights;
        for (var i = 0; i < n.length; i++)
            r.push(n[i]);
        for (var i = 0; i < h.length; i++)
            r.push(h[i]);
        return r
    },
    turnOn: function () {
        this.savePref();
        this.drawCrusts(this.data)
    },
    turnOff: function () {
        this.savePref();
        this.destroyCrusts()
    },
    destroy: function () {
        this.destroyCrusts();
        if (this.toolbar)
            this.toolbar.destroy();
        if (this.taker)
            this.taker.parentNode.removeChild(this.taker);
        delete crust
    },
    destroyCrusts: function () {
        var t = this.types;
        for (var i = 0; i < t.length; i++) {
            for (var j = 0; j < this[t[i]].length; j++)
                this[t[i]][j].destroy();
            this[t[i]] = []
        }
        for (var i = 0; i < this.wnds.length; i++)
            this.wnds[i].destroy();
        this.wnds = [];
        this.storedData = ""
    },
    popNote: function () {
        try {
            if (!this.option("allowGuestPost") && !this.authorized()) {
                this.showLogin();
                return
            }
            var p = CrustUtil.getClientRect();
            var s = CrustUtil.getClientScroll();
            var d = {
                posts: [],
                is_private: !this.option("publicNoteToDefault"),
                number_of_posts: 0,
                pos_x: (p[0] - this.option("postWindowWidth")) / 2,
                pos_y: ((p[1] - 150) / 2) + s[1],
                user_id: this.userID(),
                user_name: this.userName(),
                id: -1
            };
            var n = new CrustNote(this.parent, d, true);
            var w = this.drawPostWindow(n, d, "note", true);
            w.show();
            w.e.focus()
        } catch (e) {
            this.log(e)
        }
    },
    drawNote: function (d) {
        try {
            var n = new CrustNote(this.parent, d);
            var w = this.drawPostWindow(n, d, "note");
            n.listen("update", this, "updateCrust");
            n.p = n.c.p = w;
            this.notes.push(n);
            this.wnds.push(w);
            if (d._new)
                w.show(false, false)
        } catch (e) {
            this.log(e)
        }
    },
    drawHighlight: function (d) {
        try {
            var h = new CrustHighlight(this.parent, d);
            if (h.activated) {
                var w = this.drawPostWindow(h, d, "highlight");
                h.p = w;
                this.highlights.push(h);
                this.wnds.push(w);
                if (d._new)
                    w.show(false, true)
            }
            this.hideTaker()
        } catch (e) {
            this.log(e)
        }
    },
    drawPostWindow: function (n, d, t, b) {
        var w = new CrustPostWindow(this.parent, n, d, b);
        w.type = t;
        if (b) {
            w.listen("sendNote", this, "sendNote")
        } else {
            w.listen("delete", this, "deleteCrust");
            w.listen("sendPost", this, "sendPost");
            w.listen("editPost", this, "updatePost");
            w.listen("deletePost", this, "deleteCrust");
            w.listen("open", this, "onWindowOpen");
            w.listen("closeAll", this, "shrinkAll");
            w.listen("closeExclusive", this, "shrinkAll");
            w.listen("public", this, "makePublic");
            w.listen("private", this, "makePrivate");
            w.listen("activate", this, "onWindowActivate");
            w.listen("tag", this, "updateTag");
            w.listen("export", this, "exportToBlog");
            w.listen("needLogin", this, "showLogin")
        }
        w.listen("focus", this, "windowFocus");
        w.listen("blur", this, "windowBlur");
        return w
    },
    showLogin: function () {
        try {
            var t = this;
            if (!this.login) {
                var h = CrustUI.getHtml("needLogin");
                var a = document.createElement("div");
                a.innerHTML = h;
                var b = this.login = document.body.appendChild(a.firstChild);
                var p = CrustUtil.getClientRect(),
                s = CrustUtil.getClientScroll();
                with (b) {
                    style.display = "none";
                    style.zIndex = CrustDepth.getMax()
                }
                var w = CrustElement.width(b),
                h = CrustElement.height(b) / 2;
                var y = parseInt((p[1] - h) / 2) + s[1];
                with (b.style) {
                    left = parseInt((p[0] - w) / 2) + "px";
                    top = y + "px"
                }
                $CRUST("CRUST-UI-NEEDLOGIN-CANCEL").onclick = function () {
                    t.hideLogin()
                }
            }
            this.login.style.display = "block";
            var input = $CRUST("CRUST-UI-NEEDLOGIN-INPUT");
            if (!input.onkeypress) {
                input.onkeypress = function (ev) {
                    if ((ev || event).keyCode == CrustKey.ENTER) {
                        if (t.canFillOpenID(this.value)) {
                            this.value = t.fillOpenID(this.value);
                            CrustEvent.stop(ev)
                        }
                    }
                }
            }
            if (input) {
                input.focus()
            }
        } catch (e) {
            this.log(e)
        }
    },
    hideLogin: function () {
        if (this.login)
            this.login.style.display = "none"
    },
    windowFocus: function () {
        try {
            this.disableEvents()
        } catch (e) {
            this.log(e)
        }
    },
    windowBlur: function () {
        try {
            this.enableEvents()
        } catch (e) {
            this.log(e)
        }
    },
    viewGroup: function (g) {
        this.filterCrusts("group", g.id);
        for (var i = 0; i < this.wnds.length; i++)
            this.wnds[i].groupChanged(g)
    },
    viewAll: function () {
        this.filterCrusts("all")
    },
    viewMy: function () {
        this.filterCrusts("my")
    },
    toggleAll: function () {
        alert("toggleAll")
    },
    expandAll: function () {
        this._p = this.wnds.slice(0);
        this.showWindow();
        if (!this.pref("EXPAND_ALL")) {
            this.pref("EXPAND_ALL", true);
            this.savePref()
        }
    },
    shrinkAll: function (d) {
        var t = this.types;
        for (var i = 0; i < t.length; i++)
            for (var j = 0; j < this[t[i]].length; j++)
                if (!d || this[t[i]][j] != d.obj)
                    this.toggleNote(this[t[i]][j], false);
        this.pref("EXPAND_ALL", false);
        this.savePref()
    },
    toggleNote: function (n, b, x) {
        if (b)
            n.p.show(true);
        else if (n.p.activated)
            n.p.hide()
    },
    showWindow: function () {
        if (this._p.length == 0)
            return;
        var n = 1;
        if (this._p.length < 10)
            n = 5;
        var p = this._p.splice(0, n);
        for (var i = 0; i < p.length; i++) {
            p[i].show(i == p.length - 1)
        }
    },
    onWindowActivate: function () {
        var _this = this;
        window.setTimeout(function () {
            _this.showWindow()
        }, 50)
    },
    onWindowOpen: function (d) {
        var w = d.obj;
        if (this.curWindow) {
            this.curWindow.c.style.zIndex = this.curWindow.depth;
            if (this.curWindow.shadow)
                this.curWindow.shadow.style.zIndex = this.curWindow.depth_s
        }
        if (w.shadow)
            w.shadow.style.zIndex = CrustDepth.getMax() - 2;
        w.c.style.zIndex = CrustDepth.getMax() - 1;
        this.curWindow = w
    },
    getCrusts: function () {
        this.request.getJSON(LemonPen.URL_GET, "url=" + encodeURIComponent(this.location()) + "&url_request=" + encodeURIComponent(LemonPen.URL_GET), this, "onCrusts")
    },
    makePublic: function (d) {
        this.sender = d.sender;
        this.storedData = "type=note_to_public&id=" + d.id + "&group_id=" + d.group_id + "&url_request=" + encodeURIComponent(LemonPen.URL_UPDATE);
        if (LemonPen.Pizza)
            this.cast("LemonPenToPublic");
        else
            this.request.getJSON(LemonPen.URL_UPDATE, this.storedData, this, "onUpdateComplete")
    },
    makePrivate: function (d) {
        this.sender = d.sender;
        this.storedData = "type=note_to_private&id=" + d.id + "&url_request=" + encodeURIComponent(LemonPen.URL_UPDATE);
        if (LemonPen.Pizza)
            this.cast("LemonPenToPublic");
        else
            this.request.getJSON(LemonPen.URL_UPDATE, this.storedData, this, "onUpdateComplete")
    },
    _sendHighlight: function () {
        var d = CrustRange.serialize();
        this.sendHighlight(d)
    },
    sendHighlight: function (d) {
        if (!this.option("allowGuestPost") && !this.authorized()) {
            this.showLogin();
            return
        }
        var group_id = 0;
        if (this.option("publicNoteToDefault"))
            group_id = 1;
        var data = {
            tags: [],
            openid_url: this.openID(),
            group_name: null,
            group_id: group_id,
            is_private: !this.option("publicNoteToDefault"),
            user_id: this.userID(),
            user_name: this.userName(),
            created: "방금전",
            number_of_posts: 0,
            info: d.json,
            pos_x: 0,
            pos_y: 0,
            id: "{HIGHLIGHT_ID}",
            text: d.text,
            result: "success",
            type: "highlight",
            posts: [],
            url: this.location()
        };
        this.drawHighlight(data);
        this.hideTaker();
        this.storedData = "contents=&pos_x=0&pos_y=0&url=" + encodeURIComponent(this.location()) + "&group_id=" + group_id + "&title=" + encodeURIComponent(this.title()) + "&text=" + encodeURIComponent(d.text) + "&source=" + encodeURIComponent(d.source) + "&info=" + encodeURIComponent(d.json) + "&type=highlight&url_request=" + encodeURIComponent(LemonPen.URL_ADD);
        if (LemonPen.Pizza)
            this.cast("LemonPenHighlight");
        else
            this.request.getJSON(LemonPen.URL_ADD, this.storedData, this, "onHighlightComplete")
    },
    sendNote: function (d) {
        var contents = d.contents;
        this.sender = d.sender;
        var is_public = d.is_public;
        if (isNaN(is_public))
            is_public = 0;
        if (this.option("publicNoteToDefault"))
            is_public = 1;
        var pos = d.position;
        this.storedData = "contents=" + encodeURIComponent(contents) + "&pos_x=" + pos[0] + "&pos_y=" + pos[1] + "&group_id=" + is_public + "&url=" + encodeURIComponent(this.location()) + "&title=" + encodeURIComponent(this.title()) + "&type=note&url_request=" + encodeURIComponent(LemonPen.URL_ADD);
        if (this.sender)
            this.sender.destroy();
        if (LemonPen.Pizza)
            this.cast("LemonPenSendNote");
        else
            this.request.getJSON(LemonPen.URL_ADD, this.storedData, this, "onSendNoteComplete")
    },
    sendPost: function (d) {
        var contents = d.contents;
        var is_public = d.is_public;
        if (isNaN(is_public))
            is_public = 0;
        this.sender = d.sender;
        this.storedData = "annotation_id=" + d.id + "&contents=" + encodeURIComponent(contents) + "&group_id=" + is_public + "&type=" + d.type + "_comment&post_type=" + d.type + "&parent_no=" + (d.parent_no || "") + "&url_request=" + encodeURIComponent(LemonPen.URL_ADD);
        if (LemonPen.Pizza)
            this.cast("LemonPenPost");
        else
            this.request.getJSON(LemonPen.URL_ADD, this.storedData, this, "onSendPostComplete")
    },
    exportToBlog: function (d) {
        this.sender = d.sender;
        var title = window.prompt(this.msg("EXPORT_BLOG_NAME"), "");
        var trackback = window.prompt(this.msg("EXPORT_TRACKBACK_URL"), "");
        var p = [];
        if (trackback && trackback.length && title && title.length) {
            p.push("type=note_to_blog");
            p.push("id=" + d.id);
            p.push("title=" + encodeURIComponent(title));
            p.push("trackback=" + encodeURIComponent(trackback))
        }
        if (p.length == 0)
            return;
        this.storedData = p.join("&");
        if (LemonPen.Pizza)
            this.cast("LemonPenExport");
        else
            this.request.getJSON(LemonPen.URL_EXPORT, this.storedData, this, "onExportComplete")
    },
    updatePost: function (d) {
        this.sender = d.sender;
        var is_public = d.is_public;
        if (isNaN(is_public))
            is_public = 0;
        this.storedData = "type=post&url_request=" + encodeURIComponent(LemonPen.URL_UPDATE) + "&id=" + d.id + "&contents=" + encodeURIComponent(d.contents) + "&group_id=" + is_public;
        if (LemonPen.Pizza)
            this.cast("LemonPenUpdatePost");
        else
            this.request.getJSON(LemonPen.URL_UPDATE, this.storedData, this, "onUpdatePostComplete")
    },
    deleteCrust: function (data) {
        var b = window.confirm(this.msg("CONFIRM_DELETE_CRUST"));
        if (b == false)
            return false;
        this.sender = data.sender;
        this.storedData = "type=" + data.type + "&id=" + data.id + "&url_request=" + encodeURIComponent(LemonPen.URL_DELETE);
        if (LemonPen.Pizza)
            this.cast("LemonPenDelete");
        else
            this.request.getJSON(LemonPen.URL_DELETE, this.storedData, this, "onDeleteComplete")
    },
    updateCrust: function (d) {
        this.storedData = "id=" + d.id + "&pos_x=" + d.x + "&pos_y=" + d.y + "&type=" + d.type + "&url_request=" + encodeURIComponent(LemonPen.URL_UPDATE);
        if (LemonPen.Pizza)
            this.cast("LemonPenUpdateNote");
        else
            this.request.getJSON(LemonPen.URL_UPDATE, this.storedData, this, "onUpdateComplete")
    },
    updateTag: function (d) {
        this.storedData = "type=tag&id=" + d.id + "&tags=" + d.tags;
        this.sender = d.sender;
        if (LemonPen.Pizza)
            this.cast("LemonPenTag");
        else
            this.request.getJSON(LemonPen.URL_UPDATE, this.storedData, this, "onTagComplete")
    },
    saveOption: function (d) {
        this.storedData = "value=" + encodeURIComponent(d.data);
        if (LemonPen.Pizza)
            this.cast("LemonPenOption");
        else
            this.request.getJSON(LemonPen.URL_OPTION, this.storedData, this, "onOptionComplete")
    },
    onError: function (e) {
        throw ("onError :\n" + print_r(e, true))
    },
    onOptionComplete: function (d) {
        if (d.result != "success")
            throw ("[onOptionComplete] " + d.message)
    },
    onTagComplete: function (d) {
        if (d.result != "success")
            throw ("[onTagComplete] " + d.message);
        if (this.sender)
            this.sender.onTagComplete(d)
    },
    onExportComplete: function (d) {
        if (d.result != "success")
            throw ("[onExportComplete] " + d.message);
        alert(this.msg("EXPORT_SUCCESS"))
    },
    onCrusts: function (result) {
        try {
            var _this = this;
            if (!this.data)
                this.data = result;
            this.drawUI();
            if (this.pref("TURNOFF"))
                return;
            window.setTimeout(function () {
                _this.drawCrusts(result)
            }, 100);
            if (this.toolbar)
                this.toolbar.onResize();
            if (this.option("enableHighlight"))
                this.addHandlers();
            if (this.option("enableHotkeys"))
                this.addHotkeyHandler();
            CrustEvent.listenEvent(window, "resize", this, "onResize");
            var v = ["onkeydown", "onkeyup", "onkeypress"];
            for (var i = 0; i < v.length; i++)
                if (typeof document[v[i]] == "function")
                    this.funcs.push({
                        evt: v[i],
                        func: document[v[i]]
                    })
        } catch (e) {
            this.log(e)
        }
    },
    addHotkeyHandler: function () {},
    onDocKeyPress: function (ev) {
        try {
            ev = ev || event;
            var keys = this.option("hotkeys");
            var k = [];
            if (ev.ctrlKey)
                k.push("CTRL");
            k.push(String.fromCharCode(ev.which).toUpperCase());
            var h = k.join("+"),
            a = keys[h];
            if (a) {
                this[a](ev);
                CrustEvent.stop(ev)
            }
        } catch (e) {
            this.log(e)
        }
    },
    disableEvents: function () {
        try {
            for (var i = 0; i < this.funcs.length; i++)
                document[this.funcs[i].evt] = null
        } catch (e) {
            this.log(e)
        }
    },
    enableEvents: function () {
        try {
            for (var i = 0; i < this.funcs.length; i++)
                document[this.funcs[i].evt] = this.funcs[i].func
        } catch (e) {
            this.log(e)
        }
    },
    onResize: function () {
        try {
            if (this.toolbar)
                this.toolbar.onResize();
            for (var i = 0; i < this.highlights.length; i++)
                this.highlights[i].onResize();
            for (var i = 0; i < this.notes.length; i++)
                this.notes[i].onResize()
        } catch (e) {
            this.log(e)
        }
    },
    onHighlightComplete: function (d) {
        var h;
        for (var i = 0; i < this.highlights.length; i++) {
            if (this.highlights[i].id == "{HIGHLIGHT_ID}") {
                h = this.highlights[i];
                break
            }
        }
        if (h) {
            if (d.result != "success")
                h.destroy();
            else
                h.onSuccess(d)
        }
    },
    onSendNoteComplete: function (d) {
        if (d.result != "success")
            throw ("[onSendNoteComplete] " + d.message);
        d._new = true;
        this.drawNote(d)
    },
    onUpdateComplete: function (r) {
        try {
            if (r.result != "success")
                throw ("[onUpdateComplete] " + r.message);
            switch (r.type) {
            case "note_to_public":
                var g = r.group_id && r.group_id != LemonPen.PUBLIC_GROUP;
                if (this.sender)
                    this.sender[g ? "onGroup" : "onPublic"](r);
                if (g) {
                    this.pref("ACTIVE_GROUP", r.group_id);
                    for (var i = 0; i < this.wnds.length; i++)
                        this.wnds[i].groupChanged(r);
                    this.savePref()
                }
                break;
            case "note_to_private":
                if (this.sender)
                    this.sender.onPrivate(r);
                break
            }
            this.sender = null
        } catch (e) {
            this.log(e)
        }
    },
    onDeleteComplete: function (d) {
        if (d.result != "success")
            throw ("[onDeleteComplete] " + d.message);
        switch (d.type) {
        case "highlight_comment":
        case "annotation_comment":
        case "note_comment":
            if (this.sender)
                this.sender.onDeletePost(d);
            break;
        case "note":
        case "highlight":
            var a = this[d.type + "s"];
            for (var n, i = 0; i < a.length; i++) {
                n = a[i];
                if (n.id == d.id) {
                    n.destroy();
                    n.p.destroy()
                }
            }
            break
        }
        this.sender = null
    },
    onUpdatePostComplete: function (d) {
        if (d.result != "success")
            throw ("[onUpdatePostComplete] " + d.message);
        if (this.sender)
            this.sender.onUpdatePost(d);
        this.sender = null
    },
    onSendPostComplete: function (d) {
        if (d.result != "success")
            throw ("[onSendPostComplete] " + d.message);
        if (this.sender)
            this.sender.onSendPost(d);
        this.sender = null
    }
});
var CrustDepth = CrustClass.create();
CrustDepth.BASE_DEPTH_UI = 100000;
CrustDepth.BASE_DEPTH_HANDLER = 20000;
CrustDepth.BASE_DEPTH_POSTWINDOW = 30000;
CrustDepth.OBJECT_COUNT = 0;
CrustDepth.MAX = 90000;
CrustClass.extend(CrustDepth, {
    getUI: function () {
        return CrustDepth.BASE_DEPTH_UI + (++CrustDepth.OBJECT_COUNT)
    },
    getHandler: function () {
        return CrustDepth.BASE_DEPTH_HANDLER + (++CrustDepth.OBJECT_COUNT)
    },
    getPostWindow: function () {
        return CrustDepth.BASE_DEPTH_POSTWINDOW + (++CrustDepth.OBJECT_COUNT)
    },
    getMax: function () {
        return CrustDepth.MAX
    }
});
var CrustLocalization = {
    MESSAGES: {
        ko: {
            OPENID: "오픈아이디",
            LOGIN: "로그인",
            SCRAPBOOK: "스크랩북 보기",
            DIALOG_CANCEL: "취소",
            CONFIRM_DELETE_CRUST: "삭제하시겠습니까?",
            HELP_CLOSED_BETA: "<strong>레몬펜은 현재 클로즈드 베타테스트 중입니다.</strong><br/>베타테스터로 초대받으신 분께서는 로그인을 해주세요.",
            HELP_CLOSED_BETA_PLAIN: "레몬펜은 현재 클로즈드 베타테스트 중입니다.\n베타테스터로 초대받으신 분께서는 로그인을 해주세요.",
            ACTION_NEWNOTE: "쪽지 만들기",
            MENU_POSTWINDOW_TOOLS: "도구 모음",
            MENU_POSTWINDOW_CLOSE: "닫기",
            MENU_POSTWINDOW_DELETE: "삭제하기",
            MENU_POSTWINDOW_EXPORT: "블로그로 내보내기",
            MENU_POSTWINDOW_CLOSE_ALL: "모든 메모 닫기",
            MENU_POSTWINDOW_CLOSE_EXCLUSIVE: "다른 모든 쪽지 닫기",
            MENU_POSTWINDOW_MAKEPUBLIC: "전체 공개하기",
            MENU_POSTWINDOW_SHAREGROUP: "#{GROUP} 그룹과 공유",
            MENU_POSTWINDOW_NOSHARE: "나 혼자 보기",
            TOOLTIP_HIGHLIGHT: "형광펜 칠하기",
            TOOLTIP_HIGHLIGHT_TAKER: "형광펜 칠하기",
            TOOLTIP_DELETE_POST: "덧글 삭제하기",
            TOOLTIP_REPLY_POST: "답변달기",
            TOOLTIP_TAG_EDIT: "태그를 수정하시려면 클릭하세요. (ENTER : 저장, ESC : 취소)",
            OPENID_LOGGED_AS: "아래의 아이디로 로그인하셨습니다.",
            EDITOR_DEFAULT_TEXT: "",
            EXPORT_TRACKBACK_URL: "트랙백 주소를 입력하세요",
            EXPORT_BLOG_NAME: "포스트 제목을 입력하세요",
            EXPORT_SUCCESS: "잘 보냈습니다.",
            MENU_TOOLBAR_EXPANDALL: "모두 펼치기",
            MENU_TOOLBAR_SHRINKALL: "모두 보기",
            MENU_TOOLBAR_NOSHARE: "내 것만 보기",
            MENU_TOOLBAR_SHOWGROUP: "#{GROUP} 그룹과 공개",
            MENU_TOOLBAR_SHOWALL: "전체 보기",
            BUTTON_SAVE_AS_PRIVATE: "저장하기",
            BUTTON_SAVE_AS_PUBLIC: "저장하기",
            TOOLTIP_BUTTON_SAVE_AS_PRIVATE: "저장하기",
            TOOLTIP_BUTTON_SAVE_AS_PUBLIC: "공개된 글로 저장하기",
            STATUS_POST_SAVING: "저장 중입니다..",
            STATUS_POST_SAVED: "저장되었습니다.",
            STATUS_POSTWINDOW_PRIVATE: '내 개인 쪽지 (#{created})',
            STATUS_POSTWINDOW_PUBLIC: '<strong>#{author}</strong>님의 공개 쪽지 (#{created})',
            STATUS_POSTWINDOW_GROUP: '<strong>#{author}</strong>님의 <strong>#{group}</strong> 그룹 쪽지 (#{created})',
            STATUS_POSTWINDOW_GUEST: 'PC에 저장된 쪽지 (#{created})',
            STATUS_POSTWINDOW_BLANK: 'PC에만 저장됨',
            STATUS_POSTWINDOW_BLANK_LOGGED: '<strong>#{author}</strong>',
            EDITOR_OPTION_PUBLIC: "이 메모를 공개합니다.",
            HELP_MAKE_PUBLIC: "<strong>내 쪽지가 모두에게 공개되며,<br/>다른 사용자들과\"함께\" 의견을 주고 받을 수 있습니다.</strong><br/>명예훼손, 저작권침해 등 타인의 권리를 침해하는 메모는 법률에 따라 제재를 받을 수 있습니다.",
            HELP_LOGIN_TO_POST_PUBLIC: "",
            LABEL_MAKE_PUBLIC: "공개하기 &raquo;",
            HELP_NO_TAG: "태그를 입력하세요",
            HELP_POST_VIRTUAL_DELETED: "삭제되었습니다.",
            HELP_NEEDLOGIN: "<strong>현재 로그인이 되어 있지 않아 쪽지들이 PC에만 저장되어 있습니다.</strong><br/>메모를 공개하거나 공개하려면 로그인을 해주세요.",
            HELP_SIGNUP: "오픈아이디가 없다면 여기를 눌러 오픈아이디를 만드세요",
            LINK_SIGNUP: "https://www.myid.net/signup/lemonpen"
        },
        en: {}
    }
};
var CrustLocalizer = {
    lang: "ko",
    initialize: function (lang) {
        CrustLocalizer.lang = lang
    },
    get: function (k) {
        if (CrustLocalization.MESSAGES[CrustLocalizer.lang][k])
            return CrustLocalization.MESSAGES[CrustLocalizer.lang][k];
        return ""
    }
};
var CrustOption = CrustClass.create();
CrustClass.extend(CrustOption, CrustBase.prototype);
CrustClass.extend(CrustOption, {
    COOKIE_NAME: "CRUST_OPTION",
    items: {
        enableUI: true,
        enableNote: true,
        enableAnnotation: false,
        enableHighlight: true,
        enableCatchBlock: false,
        enableHighlightTaker: true,
        enableMatchingLine: true,
        enableToolbar: true,
        enableTag: true,
        enableExport: false,
        enableHotkeys: true,
        enableOpenID: true,
        postReplyPadding: 15,
        postWindowWidth: 250,
        postWindowResizable: true,
        postWindowDoubleClickToClose: true,
        allowNoteToPublic: true,
        allowGuestPost: false,
        publicNoteToDefault: true,
        postWindowMinWidth: 150,
        postWindowMaxWidth: 600,
        minHighlightChars: 2,
        maxHighlightChars: 400,
        cursorPosX: 6,
        cursorPosY: -6,
        hotkeys: {
            "CTRL+N": "popNote",
            "ALT+`": "toggleAll",
            "`": "_sendHighlight"
        }
    },
    privs: {
        privateAnnotation: true,
        groupAnnotation: true,
        publicAnnotation: true
    },
    prefs: {
        TOOLBAR_POS_Y: 0,
        TURNOFF: false,
        HIGHLIGHT_COLOR: "#E4FD00",
        HIGHLIGHT_COLOR_MY: "#E4FD00",
        ACTIVE_GROUP: 0,
        FILTER: "",
        FILTER_GROUP: 0,
        EXPAND_ALL: false
    },
    option: function (k, v) {
        if (typeof v == "undefined")
            return this.getOption(k);
        return this.setOption(k, v)
    },
    getOption: function (k) {
        return this.items[k]
    },
    setOption: function (k, v) {
        this.items[k] = v;
        return this.getOption(k)
    },
    pref: function (k, v) {
        if (typeof v == "undefined")
            return this.getPref(k);
        return this.setPref(k, v)
    },
    getPref: function (k) {
        return this.prefs[k]
    },
    setPref: function (k, v) {
        this.prefs[k] = v;
        return v
    },
    savePref: function () {
        this.fire("save", {
            data: CrustUtil.jsonize(this.prefs)
        })
    },
    importPref: function (p) {
        for (var a in p)
            if (typeof p[a] != "function" && typeof this.prefs[a] != "undefined")
                this.prefs[a] = p[a]
    }
});
var CrustNote = CrustClass.create();
CrustClass.extend(CrustNote.prototype, CrustBase.prototype);
CrustClass.extend(CrustNote.prototype, {
    c: null,
    data: null,
    p: null,
    id: null,
    type: "note",
    g_id: null,
    g_name: null,
    cl: "",
    cl_m: "CRUST-UI-NOTE-HANDLER CRUST-UI-NOTE-HANDLER-PRIVATE",
    cl_p: "CRUST-UI-NOTE-HANDLER CRUST-UI-NOTE-HANDLER-PUBLIC",
    cl_g: "CRUST-UI-NOTE-HANDLER CRUST-UI-NOTE-HANDLER-GROUP",
    cl_new: null,
    initialize: function (p, d, b) {
        this.p = p;
        this.data = d;
        this.id = d.id;
        this.uid = "POSTIT-" + d.id;
        this.blank = b;
        this.g_id = d.group_id;
        this.g_name = d.group_name;
        this.draw()
    },
    draw: function () {
        try {
            var _this = this,
            uid = "POSTIT-" + this.data.id,
            n = document.createElement("div");
            if (this.data.is_private)
                this.cl = this.cl_m;
            else if (this.g_id && this.g_id > 1)
                this.cl = this.cl_g;
            else
                this.cl = this.cl_p;
            n.className = this.cl;
            n.innerHTML = this.data.number_of_posts;
            n.style.position = "absolute";
            n.style.left = this.data.pos_x + "px";
            n.style.top = this.data.pos_y + "px";
            n.posX = this.data.pos_x;
            n.posY = this.data.pos_y;
            n.style.zIndex = CrustDepth.getHandler();
            n.setAttribute("uid", uid);
            n.setAttribute("handler", "y");
            n.setAttribute("dragging", "n");
            this.c = n;
            n.onmouseover = function () {
                this.className = _this.cl + "-ON"
            };
            n.onmouseout = function () {
                this.className = _this.cl
            };
            n.onclick = function () {
                if (this.getAttribute("dragging") == "y")
                    return;
                this.p[this.p.visible() ? "hide" : "show"]()
            };
            this.p.appendChild(n);
            CrustDrag.init(this.c, this)
        } catch (e) {
            this.log(e)
        }
    },
    show: function () {
        this.c.style.display = ""
    },
    hide: function (b) {
        this.c.style.display = "none"
    },
    filtered: function (h) {
        this[h ? "hide" : "show"]();
        if (this.p)
            this.p.filtered(h)
    },
    adjustPosition: function () {
        try {
            var p = CrustUtil.getClientRect(),
            w = CrustElement.width(this.c);
            if (this.c.posX + w > p[0]) {
                var x = this.c.posX;
                do {
                    x -= 1
                } while (x + w > p[0]);
                this.moveTo(x, this.c.posY, false)
            }
        } catch (e) {
            this.log(e)
        }
    },
    onResize: function () {
        this.adjustPosition()
    },
    onDrag: function (e, x, y) {
        e.setAttribute("dragging", "y")
    },
    onDragStart: function (e, x, y) {},
    onDragEnd: function (e, x, y) {
        this.moveTo(x, y);
        window.setTimeout(function () {
            e.setAttribute("dragging", "n")
        }, 100)
    },
    addPost: function (p) {
        this.data.number_of_posts += 1;
        this.update()
    },
    deletePost: function (p) {
        this.data.number_of_posts -= 1;
        this.update()
    },
    moveTo: function (x, y, b) {
        if (typeof b == "undefined")
            b = true;
        if (b && this.data.user_id == this.userID() && (this.c.posX != x || this.c.posY != y))
            this.fire("update", {
                id: this.data.id,
                x: x,
                y: y,
                type: this.type
            });
        with (this.c) {
            style.left = x + "px";
            style.top = y + "px";
            posX = x;
            posY = y
        }
    },
    onPublic: function (d) {
        this.c.className = this.cl = this.cl_p;
        this.g_id = d.group_id;
        this.g_name = d.group_name;
        this.data.is_private = false
    },
    onPrivate: function (d) {
        this.c.className = this.cl = this.cl_m;
        this.g_id = this.g_name = null;
        this.data.is_private = true
    },
    onGroup: function (d) {
        this.c.className = this.cl = this.cl_g;
        this.g_id = d.group_id;
        this.g_name = d.group_name;
        this.data.is_private = false
    },
    update: function () {
        this.c.innerHTML = this.data.number_of_posts
    },
    destroy: function () {
        this.c.parentNode.removeChild(this.c)
    }
});
var CrustHighlight = CrustClass.create();
CrustClass.extend(CrustHighlight.prototype, CrustBase.prototype);
CrustClass.extend(CrustHighlight.prototype, {
    data: null,
    p: null,
    id: null,
    type: "note",
    c: null,
    activated: false,
    timer: null,
    d1: [],
    d2: [],
    d3: [],
    r: null,
    g_id: null,
    g_name: null,
    cl: null,
    cl_m: "CRUST-UI-HIGHLIGHT-HANDLER CRUST-UI-HIGHLIGHT-HANDLER-PRIVATE",
    cl_p: "CRUST-UI-HIGHLIGHT-HANDLER CRUST-UI-HIGHLIGHT-HANDLER-PUBLIC",
    cl_g: "CRUST-UI-HIGHLIGHT-HANDLER CRUST-UI-HIGHLIGHT-HANDLER-GROUP",
    initialize: function (p, d) {
        try {
            this.p = p;
            this.setData(d);
            if (this.data.text.length > 0)
                this.draw()
        } catch (e) {
            this.log(e)
        }
    },
    setData: function (d) {
        this.data = d;
        this.id = d.id;
        this.d1 = [];
        this.d2 = [];
        this.d3 = [];
        this.uid = "HIGHLIGHT-" + d.id;
        this.g_id = d.group_id;
        this.g_name = d.group_name
    },
    onSuccess: function (d) {
        this.setData(d);
        var s = CrustElement.getElementsByClassName("span", "CRUST-UI-HIGHLIGHT-SEG-{HIGHLIGHT_ID}"),
        elem;
        for (var i = 0; i < s.length; i++)
            s[i].className = s[i].className.replace(/\{HIGHLIGHT_ID\}/, d.id);
        var o = $CRUST("CRUST-UI-HIGLIGHT-{HIGHLIGHT_ID}");
        if (o)
            o.id = o.id.replace(/\{HIGHLIGHT_ID\}/, d.id);
        if (this.p)
            this.p.onSuccess(d)
    },
    draw: function () {
        try {
            CrustRange.clear();
            var _this = this,
            r = CrustRange.find(this.data, this.p);
            if (!r || r.length == 0)
                return;
            var q,
            h,
            cl = this.pref(this.data.user_id == this.userID() ? "HIGHLIGHT_COLOR_MY" : "HIGHLIGHT_COLOR");
            var t = document.createElement("span");
            t.className = "CRUST-UI-HIGHLIGHT-ELEMENT";
            t.style.backgroundColor = cl;
            var tags = ["img", "br", "hr"];
            var sel = window.getSelection();
            if (r[0].cloneRange) {
                var b,
                c,
                d,
                p,
                f,
                n;
                for (var i = 0; i < r.length; i++) {
                    b = false;
                    n = 0;
                    f = r[i].extractContents();
                    if (i == r.length - 1) {
                        var u = document.createElement("span");
                        h = "CRUST-UI-HIGLIGHT-" + this.data.id;
                        u.className = "CRUST-UI-HIGHLIGHT-INDICATOR";
                        u.innerHTML = " ";
                        u.id = h;
                        r[i].insertNode(u)
                    }
                    for (var j = f.childNodes.length - 1; j >= 0; j--) {
                        d = null,
                        o = null;
                        c = f.childNodes[j];
                        if (c.nodeType == 1 && CrustUtil.inArray(tags, c.nodeName.toLowerCase()) == false) {
                            d = c.cloneNode(true);
                            d.innerHTML = '<span class="CRUST-UI-HIGHLIGHT-ELEMENT CRUST-UI-HIGHLIGHT-SEG-' + this.data.id + '" style="background-color:' + cl + '">' + c.innerHTML + '</span>';
                            n = 1
                        } else if (c.nodeType == 3) {
                            d = t.cloneNode(true);
                            d.className = "CRUST-UI-HIGHLIGHT-ELEMENT CRUST-UI-HIGHLIGHT-SEG-" + this.data.id;
                            d.innerHTML = CrustUtil.escapeHtml(c.textContent);
                            d.style.display = "inline";
                            n = 2
                        } else {
                            d = c.cloneNode(true);
                            n = 0
                        }
                        if (!d)
                            continue;
                        if (d)
                            r[i].insertNode(d);
                        d.onmouseover = function () {
                            if (_this.timer)
                                window.clearTimeout(_this.timer);
                            _this.show()
                        };
                        d.onmouseout = function () {
                            if (_this.timer)
                                window.clearTimeout(_this.timer);
                            var n = _this.data.number_of_posts;
                            _this.timer = window.setTimeout(function () {
                                if (n == 0)
                                    _this.hide()
                            }, 1000)
                        };
                        if (n == 1) {
                            this.d3.push(d.parentNode);
                            this.d2.push(d);
                            this.d1.push(c)
                        } else if (n == 2) {
                            this.d3.push(d);
                            this.d2.push(d.firstChild);
                            this.d1.push(d.firstChild.firstChild)
                        }
                    }
                }
            } else {
                var v,
                c,
                h = [];
                for (var i = 0; i < r.length; i++) {
                    if (r[i].htmlText.length == 0)
                        continue;
                    v = document.createElement("div");
                    v.innerHTML = r[i].htmlText;
                    c = v.childNodes;
                    f = [];
                    for (var j = 0; j < c.length; j++) {
                        switch (c[j].nodeType) {
                        case 1:
                            c[j].innerHTML = "" + '<span class="CRUST-UI-HIGHLIGHT-ELEMENT CRUST-UI-HIGHLIGHT-SEG-' + this.data.id + '" style="background-color:' + cl + '">' + (c[j].firstChild.outerHTML || c[j].firstChild.nodeValue) + '</span>';
                            break;
                        case 3:
                            if (c[j].nodeValue) {
                                var k = t.cloneNode(false);
                                k.className = "CRUST-UI-HIGHLIGHT-ELEMENT CRUST-UI-HIGHLIGHT-SEG-" + this.data.id;
                                k.innerHTML = c[j].nodeValue;
                                c[j].parentNode.replaceChild(k, c[j])
                            }
                            break
                        }
                    }
                    if (i == r.length - 1) {
                        var u = document.createElement("span");
                        with (u) {
                            id = "CRUST-UI-HIGLIGHT-" + this.data.id;
                            style.display = "inline";
                            style.cssText = "display:inline;padding:0 !important;margin:0 !important;width:0 !important";
                            innerHTML = " "
                        }
                        h = "CRUST-UI-HIGLIGHT-" + this.data.id;
                        v.appendChild(u)
                    }
                    r[i].pasteHTML(v.innerHTML)
                }
                var d,
                ds = CrustElement.getElementsByClassName("span", "CRUST-UI-HIGHLIGHT-ELEMENT CRUST-UI-HIGHLIGHT-SEG-" + this.data.id);
                for (var i = 0; i < ds.length; i++) {
                    d = ds[i];
                    d.onmouseover = function () {
                        if (_this.timer)
                            window.clearTimeout(_this.timer);
                        _this.show()
                    };
                    d.onmouseout = function () {
                        if (_this.timer)
                            window.clearTimeout(_this.timer);
                        var n = _this.data.number_of_posts;
                        _this.timer = window.setTimeout(function () {
                            if (n == 0)
                                _this.hide()
                        }, 1000)
                    }
                }
            }
            CrustRange.clear();
            if (h)
                q = document.getElementById(h);
            q.innerHTML = "&nbsp;";
            var p = CrustPosition.cumulative(q);
            q.innerHTML = "";
            var n = this.c = document.createElement("div");
            var x = p[0];
            var y = p[1] - 21;
            if (this.data.is_private)
                this.cl = this.cl_m;
            else if (this.g_id && this.g_id > 1)
                this.cl = this.cl_g;
            else
                this.cl = this.cl_p;
            n.className = this.cl;
            n.innerHTML = this.data.number_of_posts;
            n.style.left = "-1000px";
            n.style.top = "-1000px";
            n.style.position = "absolute";
            n.style.zIndex = CrustDepth.getHandler();
            n.setAttribute("dragging", "n");
            n.posX = x;
            n.posY = y;
            n.onmouseover = function () {
                this.className = _this.cl + "-ON";
                if (_this.timer)
                    window.clearTimeout(_this.timer)
            };
            n.onmouseout = function () {
                this.className = _this.cl
            };
            n.onclick = function () {
                if (this.getAttribute("dragging") == "y")
                    return;
                _this.p[_this.p.visible() ? "hide" : "show"]()
            };
            this.activated = true;
            this.p.appendChild(n);
            this.r = q;
            CrustDrag.init(n, this, null, x - 40, x + 40, y - 40, y + 40);
            if (this.data.number_of_posts == 0) {
                n.style.display = "none"
            }
            n.style.left = x + "px";
            n.style.top = y + "px";
            return false
        } catch (e) {
            this.log(e)
        }
    },
    show: function () {
        if (this.c)
            this.c.style.display = ""
    },
    hide: function () {
        if (this.c)
            this.c.style.display = "none"
    },
    moveTo: function (x, y) {},
    onResize: function () {
        return;
        try {
            with (this.r) {
                style.display = "inline";
                innerHTML = " "
            }
            var p = CrustPosition.cumulative(this.r);
            var x = p[0],
            y = p[1] - 21;
            with (this.r) {
                style.display = "none";
                innerHTML = ""
            }
            with (this.c) {
                style.left = x + "px";
                style.top = y + "px";
                posX = x;
                posY = y
            }
        } catch (e) {
            this.log(e)
        }
    },
    onDrag: function (e, x, y) {
        e.setAttribute("dragging", "y")
    },
    onDragStart: function (e, x, y) {},
    onDragEnd: function (e, x, y) {
        window.setTimeout(function () {
            e.setAttribute("dragging", "n")
        }, 100)
    },
    addPost: function (p) {
        this.data.number_of_posts += 1;
        this.update()
    },
    deletePost: function (p) {
        this.data.number_of_posts -= 1;
        this.update()
    },
    update: function () {
        this.c.innerHTML = this.data.number_of_posts
    },
    onPublic: function (d) {
        this.c.className = this.cl = this.cl_p;
        this.data.is_private = false;
        this.g_id = d.group_id;
        this.g_name = d.group_name
    },
    onPrivate: function (d) {
        this.c.className = this.cl = this.cl_m;
        this.g_id = this.g_name = null;
        this.data.is_private = true
    },
    onGroup: function (d) {
        this.c.className = this.cl = this.cl_g;
        this.data.is_private = false;
        this.g_id = d.group_id;
        this.g_name = d.group_name
    },
    _destroySeg: function (a, b) {
        try {
            if (a.childNodes.length > 1) {
                var c,
                t = [];
                while (a.hasChildNodes()) {
                    c = a.childNodes[0];
                    a.parentNode.insertBefore(c, a)
                }
            } else
                a.parentNode.replaceChild(b, a)
        } catch (e) {
            this.log(e)
        }
    },
    destroy: function () {
        try {
            this.c.parentNode.removeChild(this.c);
            var n = CrustElement.getElementsByClassName("span", "CRUST-UI-HIGHLIGHT-SEG-" + this.data.id);
            for (var i = 0; i < n.length; i++)
                this._destroySeg(n[i], n[i].firstChild);
            if (this.r)
                this.r.parentNode.removeChild(this.r)
        } catch (e) {}
    },
    filtered: function (h) {
        this[h ? "hide" : this.data.number_of_posts > 0 ? "show" : "hide"]();
        if (this.p)
            this.p.filtered(h)
    }
});
var CrustToolbar = CrustClass.create();
CrustClass.extend(CrustToolbar.prototype, CrustBase.prototype);
CrustClass.extend(CrustToolbar.prototype, {
    p: null,
    c: null,
    c_on: null,
    c_off: null,
    d: null,
    f: null,
    v: null,
    vm: null,
    timer: null,
    login: null,
    off: false,
    g_list: null,
    g: null,
    m_last: null,
    f_m: null,
    f_a: null,
    v_e: null,
    v_s: null,
    t_h: 36,
    initialize: function (p) {
        this.p = p;
        this.draw()
    },
    draw: function () {
        try {
            var _this = this;
            var t = document.createElement("div");
            t.innerHTML = CrustUI.getHtml("toolbar");
            this.c = this.p.appendChild(t.firstChild);
            this.c_on = $CRUST("CRUST-UI-TOOLBAR-CONTAINER-ON");
            this.c_off = $CRUST("CRUST-UI-TOOLBAR-CONTAINER-OFF");
            this.off = this.pref("TURNOFF");
            var v = this.vm = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW");
            v.onmouseover = function () {
                if (_this.v.style.display != "none")
                    return;
                this.className = "CRUST-UI-TOOLBAR-BUTTON-VIEW-OVER"
            };
            v.onmousedown = function () {
                if (_this.v.style.display != "none")
                    return;
                this.className = "CRUST-UI-TOOLBAR-BUTTON-VIEW-DOWN"
            };
            v.onclick = function (e) {
                _this.toggleMenu();
                CrustEvent.stop(e)
            };
            v.onmouseout = v.onmouseup = function (e) {
                if (_this.v.style.display != "none")
                    return;
                this.className = "CRUST-UI-TOOLBAR-BUTTON-VIEW"
            };
            var n = $CRUST("CRUST-UI-TOOLBAR-BUTTON-NOTE");
            n.onmouseover = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-NOTE-OVER"
            };
            n.onmousedown = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-NOTE-DOWN"
            };
            n.onmouseup = n.onmouseout = function () {
                this.className = ""
            };
            n.onclick = function () {
                _this.fire("note");
                _this.hideMenu()
            };
            var o = $CRUST("CRUST-UI-TOOLBAR-BUTTON-OFF");
            o.onmouseover = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-OFF-OVER"
            };
            o.onmouseout = o.onmouseup = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-OFF"
            };
            o.onmousedown = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-OFF-DOWN"
            };
            o.onclick = function () {
                _this.turnOff();
                _this.hideMenu()
            };
            var l = $CRUST("CRUST-UI-TOOLBAR-BUTTON-LOGIN") || $CRUST("CRUST-UI-TOOLBAR-BUTTON-LOGIN-LOGGED");
            l.onmouseover = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-LOGIN-OVER"
            };
            l.onmousedown = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-LOGIN-DOWN"
            };
            l.onmouseout = l.onmouseup = function () {
                this.className = "CRUST-UI-TOOLBAR-BUTTON-LOGIN"
            };
            l.onclick = function (e) {
                _this.hideMenu();
                _this.toggleLogin();
                CrustEvent.stop(e)
            };
            this.v_e = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-EXPANDALL");
            this.v_e.onclick = function () {
                _this.viewMode("expandAll")
            };
            this.v_s = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SHRINKALL");
            this.v_s.onclick = function () {
                _this.viewMode("shrinkAll")
            };
            $CRUST("CRUST-UI-TOOLBAR-CONTAINER-OFF").onclick = function () {
                if (_this.d.getAttribute("dragging") == "y" || _this.f.getAttribute("dragging") == "y")
                    return;
                _this.turnOn();
                _this.hideMenu()
            };
            $CRUST("CRUST-UI-TOOLBAR-HIGHLIGHTER").onclick = function () {
                _this.fire("highlight")
            };
            this.v = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEMS");
            if (CrustEnv.isIE6())
                this.v.style.position = "absolute";
            else
                this.v.style.position = "fixed";
            this.login = $CRUST("CRUST-UI-LOGIN");
            if (CrustEnv.isIE6())
                this.login.style.position = "absolute";
            else
                this.login.style.position = "fixed";
            this.c.style.zIndex = CrustDepth.getUI();
            this.d = $CRUST("CRUST-UI-TOOLBAR-DRAGGER");
            this.f = $CRUST("CRUST-UI-TOOLBAR-CONTAINER-OFF");
            this.g = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-GROUPS");
            this.d.setAttribute("dragging", "n");
            this.f.setAttribute("dragging", "n");
            this.f_a = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SHOWALL");
            this.f_a.onclick = function () {
                _this.viewFilter("all", null, this)
            };
            this.f_m = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-NOSHARE");
            this.f_m.onclick = function () {
                _this.viewFilter("my", null, this)
            };
            if (!this.authorized()) {
                var a = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-GROUPS-CONTAINER");
                a.parentNode.removeChild(a);
                this.f_a.parentNode.removeChild(this.f_a);
                this.f_m.parentNode.removeChild(this.f_m)
            }
            this.drawGroups();
            this.updateDragger();
            if (this.authorized()) {
                if (this.off)
                    this.turnOff(false);
                else
                    this.turnOn(false)
            } else {}
            if (CrustEnv.isIE6()) {
                CrustEvent.listenEvent(window, "scroll", this, "onDocScroll")
            }
            this.syncViewMode(this.pref("EXPAND_ALL") ? "expandAll" : "shrinkAll")
        } catch (err) {
            this.log(err)
        }
    },
    onDocScroll: function () {
        var s = CrustUtil.getClientScroll();
        var y = this.pref("TOOLBAR_POS_Y");
        this.c.style.top = (y + s[1]) + "px";
        this.updateDragger()
    },
    syncViewMode: function (m) {
        CrustElement.removeClass(this.v_s, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
        CrustElement.removeClass(this.v_e, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
        switch (m) {
        case "expandAll":
            CrustElement.addClass(this.v_e, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
            break;
        case "shrinkAll":
            CrustElement.addClass(this.v_s, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
            break
        }
    },
    viewMode: function (m) {
        this.syncViewMode(m);
        this.fire(m);
        this.hideMenu()
    },
    viewFilter: function (f, d, s) {
        try {
            this.pref("FILTER", f);
            switch (f) {
            case "group":
                var g = this.getGroup(d);
                this.pref("FILTER_GROUP", d);
                this.pref("ACTIVE_GROUP", d);
                this.fire("viewGroup", g);
                this.drawGroups();
                break;
            case "my":
                this.fire("viewMy");
                break;
            case "all":
                this.fire("viewAll");
                break
            }
            if (this.m_last)
                CrustElement.removeClass(this.m_last, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
            CrustElement.addClass(s, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
            this.savePref();
            this.m_last = s;
            this.hideMenu()
        } catch (e) {
            this.log(e)
        }
    },
    filtered: function (f, d) {
        var a,
        b;
        switch (f) {
        case "my":
            a = this.f_m;
            break;
        case "all":
            a = this.f_a;
            break;
        case "group":
            a = this.g;
            break
        }
        if (a) {
            CrustElement.addClass(a, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SELECTED");
            this.m_last = a
        }
        this.drawGroups()
    },
    drawGroups: function () {
        if (!this.authorized())
            return;
        var t = this;
        var a = $CRUST("CRUST-UI-TOOLBAR-BUTTON-VIEW-GROUPS-ARROW");
        var f = this.filteredGroup();
        var g = this.groups();
        this.g.innerHTML = this.msg("MENU_TOOLBAR_SHOWGROUP").replace(/#\{GROUP\}/, f ? f.name : "");
        if (g.length) {
            this.g.group_id = f.id;
            this.g.onclick = function () {
                t.viewFilter("group", this.group_id, this)
            };
            a.onclick = function () {
                t.toggleGroups()
            }
        } else {
            CrustElement.addClass(this.g, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-DISABLED");
            CrustElement.addClass(a, "CRUST-UI-HIDDEN");
            return
        }
        var a = this.g_list = $CRUST("CRUST-UI-TOOLBAR-GROUPS"),
        g = this.groups(),
        h = "";
        if (a && g.length) {
            while (a.hasChildNodes())
                a.removeChild(a.childNodes[0]);
            var l,
            n;
            for (var i = 0; i < g.length; i++) {
                if (f && g[i].id == f.id)
                    continue;
                n = this.msg("MENU_TOOLBAR_SHOWGROUP").replace(/#\{GROUP\}/, g[i].name);
                l = document.createElement("a");
                l.href = "javascript:void(0)";
                l.innerHTML = n;
                l.group_id = g[i].id;
                l.onclick = function () {
                    t.viewFilter("group", this.group_id, t.g)
                };
                a.appendChild(l)
            }
        }
    },
    toggleGroups: function () {
        this[this.g_list.style.display != "none" ? "hideGroups" : "showGroups"]()
    },
    showGroups: function () {
        if (this.g_list)
            this.g_list.style.display = "";
        this.repositionMenu()
    },
    hideGroups: function () {
        if (this.g_list)
            this.g_list.style.display = "none";
        this.repositionMenu()
    },
    onResize: function () {
        try {
            this.hideMenu();
            this.hideLogin();
            this.updateDragger()
        } catch (e) {
            this.log(e)
        }
    },
    show: function () {
        this.c.style.display = ""
    },
    hide: function () {
        this.c.style.display = "none"
    },
    applyOption: function (o) {
        if (o.TOOLBAR_POS_Y) {
            this.pref("TOOLBAR_POS_Y", o.TOOLBAR_POS_Y);
            this.updateDragger()
        }
        if (typeof o.TURNOFF == "boolean")
            this[o.TURNOFF ? "turnOff" : "turnOn"]()
    },
    updateDragger: function () {
        var x,
        p = CrustUtil.getClientRect(),
        x = p[0] - CrustElement.width(this.c),
        c = this.c,
        y = this.pref("TOOLBAR_POS_Y"),
        h = this.t_h;
        if (!y)
            y = p[1] - h;
        if (this.off) {
            x = p[0] - 89 + 65;
            x = -24
        } else {
            x = 0
        }
        y = Math.min(p[1] - h, y);
        y = Math.max(0, y);
        x -= 1;
        if (CrustEnv.isIE()) {
            if (CrustEnv.isIE6()) {
                var s = CrustUtil.getClientScroll();
                c.style.position = "absolute";
                c.style.top = (y + s[1]) + "px";
                c.style.right = "0px";
                c.style.display = "block"
            } else {
                c.style.position = "fixed";
                c.style.top = y + "px";
                c.style.right = x + "px";
                c.style.display = "block"
            }
        } else {
            c.style.position = "fixed";
            c.style.top = y + "px";
            c.style.right = x + "px";
            c.style.display = "block"
        }
        var minY = 0,
        maxY = p[1] - h;
        if (CrustEnv.isIE6()) {
            minY += s[1];
            maxY += s[1]
        }
        CrustDrag.init(this.d, this, this.c, parseInt(this.d.style.left), parseInt(this.d.style.left), minY, maxY, true);
        CrustDrag.init(this.f, this, this.c, parseInt(this.f.style.left), parseInt(this.f.style.left), minY, maxY, true)
    },
    turnOn: function (b) {
        if (typeof b == "undefined")
            b = true;
        this.c_on.style.display = "";
        this.c_off.style.display = "none";
        this.off = false;
        this.c.style.width = "89px";
        this.c.style.right = (CrustEnv.isIE6() ? 0 : -1) + "px";
        if (b) {
            this.pref("TURNOFF", false);
            this.fire("on")
        }
    },
    turnOff: function (b) {
        if (typeof b == "undefined")
            b = true;
        this.hideLogin();
        this.hideMenu();
        if (LemonPen.Pizza) {
            this.hide()
        } else {
            this.c_on.style.display = "none";
            this.c_off.style.display = "";
            if (CrustEnv.isIE6()) {
                this.c.style.width = "29px";
                this.c.style.right = "0px"
            } else {
                this.c.style.right = "-60px"
            }
        }
        this.off = true;
        if (b) {
            this.pref("TURNOFF", true);
            this.fire("off")
        }
    },
    destroy: function () {
        if (this.c) {
            this.c.parentNode.removeChild(this.c);
            CrustEvent.stopListen(document, "click", this, "onDocClick");
            CrustEvent.stopListen(document, "click", this, "onDocClick2");
            CrustEvent.stopListen(document, "keypress", this, "onDocKey")
        }
    },
    toggleLogin: function () {
        var b = this.login.style.display != "none";
        this[b ? "hideLogin" : "showLogin"]()
    },
    showLogin: function () {
        try {
            var t = this,
            r = CrustUtil.getClientRect(),
            p = CrustPosition.absolute(this.c),
            h = this.t_h,
            l = CrustElement.height(this.login);
            var b = p[1] + h + l >= r[1];
            if (b)
                CrustElement.addClass(this.login, this.authorized() ? "CRUST-UI-LOGIN-LOGGED-REVERSED" : "CRUST-UI-LOGIN-REVERSED");
            var y = (b ? p[1] - l : p[1] + h);
            if (CrustEnv.isIE6())
                y = h;
            with (this.login) {
                style.top = y + "px";
                style.display = ""
            }
            var o = $CRUST("CRUST-UI-LOGIN-INPUT");
            if (!o.onkeypress) {
                o.onkeypress = function (ev) {
                    if ((ev || event).keyCode == CrustKey.ENTER) {
                        if (t.canFillOpenID(this.value)) {
                            this.value = t.fillOpenID(this.value);
                            CrustEvent.stop(ev)
                        }
                    }
                }
            }
            o.setAttribute("name", "openid_url");
            try {
                o.focus()
            } catch (err) {};
            CrustEvent.listenEvent(document, "click", this, "onDocClick2");
            CrustEvent.listenEvent(document, "keypress", this, "onDocKey")
        } catch (e) {
            this.log(e)
        }
    },
    hideLogin: function () {
        var p = CrustPosition.absolute(this.c),
        h = this.t_h;
        with (this.login) {
            style.display = "none";
            style.top = (p[1] + h) + "px"
        }
        CrustElement.removeClass(this.login, "CRUST-UI-LOGIN-LOGGED-REVERSED");
        CrustElement.removeClass(this.login, "CRUST-UI-LOGIN-REVERSED");
        $CRUST("CRUST-UI-LOGIN-INPUT").setAttribute("name", "");
        CrustEvent.stopListen(document, "click", this, "onDocClick2");
        CrustEvent.stopListen(document, "keypress", this, "onDocKey")
    },
    onDocClick: function (e) {
        if (!this.eventInId(e, "CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEMS") && !this.eventIn(e, "CRUST-UI-TOOLBAR-BUTTON-VIEW"))
            this.hideMenu()
    },
    onDocClick2: function (e) {
        if (!this.eventInId(e, "CRUST-UI-LOGIN") && !this.eventIn(e, "CRUST-UI-TOOLBAR-BUTTON-LOGIN"))
            this.hideLogin()
    },
    onDocKey: function (e) {
        e = e || event;
        if (e.keyCode == CrustKey.ESCAPE) {
            this.hideMenu();
            this.hideLogin();
            CrustEvent.stop(e)
        }
    },
    repositionMenu: function () {
        this.v.style.top = "0px";
        this.v.style.right = "28px";
        var w = CrustElement.width(this.v);
        var h = CrustElement.height(this.v);
        var r = CrustUtil.getClientRect();
        var p = CrustPosition.cumulative(this.v);
        var b = p[1] + h >= r[1];
        if (b) {
            this.v.style.top =  - (p[1] + h - r[1]) + "px"
        }
    },
    toggleMenu: function () {
        this[CrustElement.getStyle(this.v, "display") != "none" ? "hideMenu" : "showMenu"]()
    },
    showMenu: function () {
        this.v.style.display = "";
        this.repositionMenu();
        this.hideLogin();
        CrustElement.addClass(this.vm, "CRUST-UI-TOOLBAR-BUTTON-VIEW-OPEN");
        CrustEvent.listenEvent(document, "click", this, "onDocClick");
        CrustEvent.listenEvent(document, "keypress", this, "onDocKey")
    },
    hideMenu: function () {
        CrustElement.removeClass(this.vm, "CRUST-UI-TOOLBAR-BUTTON-VIEW-OPEN");
        this.v.style.display = "none";
        this.hideGroups();
        CrustEvent.stopListen(document, "click", this, "onDocClick");
        CrustEvent.stopListen(document, "keypress", this, "onDocKey")
    },
    onDragStart: function (e, x, y) {
        this.hideLogin()
    },
    onDragEnd: function (e, x, y) {
        var t = this;
        if (CrustEnv.isIE6()) {
            var s = CrustUtil.getClientScroll();
            y -= s[1]
        }
        if (this.pref("TOOLBAR_POS_Y") != y)
            this.pref("TOOLBAR_POS_Y", y);
        window.setTimeout(function () {
            t.d.setAttribute("dragging", "n");
            t.f.setAttribute("dragging", "n")
        }, 100);
        this.savePref()
    },
    onDrag: function (e, x, y) {
        this.d.setAttribute("dragging", "y");
        this.f.setAttribute("dragging", "y")
    }
});
var CrustTrigger = CrustClass.create();
CrustClass.extend(CrustTrigger.prototype, CrustBase.prototype);
CrustClass.extend(CrustTrigger.prototype, {
    c: null,
    initialize: function (p) {
        var t = document.createElement("div"),
        _t = this;
        t.innerHTML = CrustUI.getHtml("trigger");
        this.c = p.appendChild(t.firstChild);
        this.setPosition();
        this.c.onclick = function () {
            _t.fire("click")
        };
        CrustEvent.listenEvent(window, "resize", this, "onDocResize");
        if (CrustEnv.isIE6())
            CrustEvent.listenEvent(window, "scroll", this, "onDocScroll")
    },
    setPosition: function () {
        var c = this.c,
        r = CrustUtil.getClientRect(),
        s = CrustUtil.getClientScroll(),
        y = r[1] - 40;
        c.style.position = CrustEnv.isIE6() ? "absolute" : "fixed";
        c.style.right = "0px";
        c.style.top = (CrustEnv.isIE6() ? y + s[1] : y) + "px"
    },
    onDocResize: function () {
        this.setPosition()
    },
    onDocScroll: function () {
        var r = CrustUtil.getClientRect(),
        s = CrustUtil.getClientScroll(),
        y = r[1] - 40;
        this.c.style.top = (y + s[1]) + "px"
    }
});
var CrustPostWindow = CrustClass.create();
CrustClass.extend(CrustPostWindow.prototype, CrustBase.prototype);
CrustClass.extend(CrustPostWindow.prototype, {
    p: null,
    c: null,
    m: null,
    g: null,
    shadow: null,
    shadowbody: null,
    uid: null,
    e: null,
    b: null,
    data: null,
    tag: null,
    h: null,
    activated: false,
    title: null,
    type: null,
    posts: [],
    width: 0,
    list: null,
    editorBody: null,
    depth: null,
    depth_s: null,
    tool: null,
    timer: null,
    timer_s: null,
    editors: [],
    gripper: null,
    resizing: false,
    sizer: null,
    bar: null,
    requesting: false,
    blank: false,
    foot: null,
    grback: null,
    shback: null,
    g_id: null,
    g_name: null,
    g_list: null,
    h_l: null,
    h_c: null,
    h_r: null,
    oX: null,
    oY: null,
    lists: [],
    initialize: function (p, h, d, b) {
        var t = this;
        this.p = p;
        this.h = h;
        this.blank = b;
        this.setData(d)
    },
    setData: function (d) {
        this.data = d;
        this.posts = d.posts;
        this.g_id = d.group_id;
        this.g_name = d.group_name
    },
    onSuccess: function (d) {
        this.setData(d)
    },
    drawPost: function (p) {
        try {
            if (p.contents == "")
                p.contents = " ";
            var h = [];
            var is_p = this.data.is_private;
            var a = "";
            var m_b = this.msg(is_p ? "BUTTON_SAVE_AS_PRIVATE" : "BUTTON_SAVE_AS_PUBLIC");
            var m_bt = this.msg(this._isPrivate ? "TOOLTIP_BUTTON_SAVE_AS_PRIVATE" : "TOOLTIP_BUTTON_SAVE_AS_PUBLIC");
            var m_d = this.msg("TOOLTIP_DELETE_POST");
            var m_r = this.msg("TOOLTIP_REPLY_POST");
            var is_m = p.user_id == this.userID();
            var depth = parseInt(p.depth);
            var p_l = 15 * depth;
            var uid = this.uid;
            var b_v = (parseInt(p.virtual_deleted) == 1 || p.virtual_deleted) ? true : false;
            var b_e = is_m && !b_v;
            var b_d = is_m && !b_v;
            var b_r = this.authorized() && depth < LemonPen.MAX_REPLY_DEPTH && !is_m;
            var cname = "CRUST-UI-POST-" + ((is_m ? "MY" : "OTHERS") + "-" + (is_p ? "PRIVATE" : "PUBLIC"));
            var st = "vertical-align:top !important;margin:0 !important;padding:0 !important;width:100% !important";
            if (p.depth > 0) {
                cname += " CRUST-UI-POST-REPLY";
                if (CrustEnv.isIE()) {
                    var ps = (p.depth * 0.3) + "cm 0.5cm";
                    st += ";background-position:" + ps
                } else {
                    var ps = ((p.depth * 15) - 4) + "px 18px";
                    st += ";background-position:" + ps
                }
            }
            h.push('<li id="CRUST-UI-POST-' + p.id + '" class="' + cname + '" style="' + st + '">');
            h.push('<div id="CRUST-UI-POST-CONTAINER-' + p.id + '" class="CRUST-UI-POST-CONTAINER-"' + (depth > 0 ? "REPLY" : "NONE") + '" style="padding-left:' + p_l + 'px !important">');
            h.push('<div id="CRUST-UI-POST-TOOLS-' + p.id + '" class="CRUST-UI-POST-TOOLS" style="visibility:hidden">');
            if (b_r)
                h.push('<a href="javascript:void(0)" title="' + m_r + '" parent_id="' + p.id + '" id="CRUST-UI-POST-TOOL-REPLY-' + p.id + '" class="CRUST-UI-POST-TOOL-REPLY"></a>');
            if (b_d)
                h.push('<a href="javascript:void(0)" title="' + m_d + '" post_id="' + p.id + '" id="CRUST-UI-POST-TOOL-DELETE-' + p.id + '" class="CRUST-UI-POST-TOOL-DELETE"></a>');
            h.push('</div>');
            h.push('<div id="CRUST-UI-POST-CONTENTS-' + p.id + '" class="' + (b_v ? "CRUST-UI-POST-CONTENTS-DELETED" : "CRUST-UI-POST-CONTENTS") + '" style="overflow:auto;padding:0px 10px !important"><p>' + this.htmlize(p.contents) + '</p></div>');
            if (b_e) {
                h.push('<div style="padding:0px 10px 0px 10px !important">');
                h.push('<textarea id="CRUST-UI-POST-TEXTAREA-' + p.id + '" class="CRUST-UI-POST-TEXTAREA" style="width:100%">' + this.textize(p.contents) + '</textarea>');
                h.push('</div>')
            }
            if (is_m && b_e) {
                h.push('<div id="CRUST-UI-POST-SAVE-' + p.id + '" class="CRUST-UI-POST-SAVE" style="display:none">');
                h.push('</div>');
                h.push('<div style="display:none" id="CRUST-UI-POST-SAVE-STATUS-' + p.id + '" class="CRUST-UI-POST-SAVE-STATUS"></div>')
            }
            if (is_p)
                a += p.created;
            else {
                if (p.openid_url)
                    a = '<a target="_blank" href="' + LemonPen.URL_SCRAPBOOK.replace(/\{LOCALID\}/, p.post_local_id) + '" title="' + LemonPen.URL_SCRAPBOOK.replace(/\{LOCALID\}/, p.post_local_id) + '">' + p.user_name + '</a>';
                else
                    a = '<em>' + p.user_name + '</em>';
                a += ' / ' + p.created
            }
            h.push('<div id="CRUST-UI-POST-AUTHOR-' + p.id + '" class="CRUST-UI-POST-AUTHOR"><span class="CRUST-UI-POST-AUTHOR-NAME">' + a + '</span></div>');
            if (b_r)
                h.push('<div style="padding:10px 10px 0px 10px !important;display:none" id="CRUST-UI-POST-TOOL-REPLY-CONTAINER-' + p.id + '" class="CRUST-UI-POST-TOOL-REPLY-CONTAINER"></div>');
            h.push('</div>');
            h.push('</li>');
            return h.join("")
        } catch (e) {
            this.log(e)
        }
    },
    addPost: function (p) {
        try {
            var _t = this,
            d,
            r;
            var li = document.createElement("div");
            li.innerHTML = this.drawPost(p);
            if (p.parent_no) {
                var r = $CRUST("CRUST-UI-POST-" + p.parent_no);
                var ne = null;
                for (var i = 0; i < this.lists.length; i++) {
                    if (this.lists[i].parent_no == p.parent_no && this.lists[i].depth == p.depth) {
                        ne = this.lists[i]
                    }
                }
                if (ne)
                    li = this.list.insertBefore(li.firstChild, ne.nextSibling);
                else
                    li = this.list.insertBefore(li.firstChild, r.nextSibling)
            } else {
                li = this.list.appendChild(li.firstChild)
            }
            li.parent_no = p.parent_no;
            li.depth = p.depth;
            this.lists.push(li);
            if ((r = $CRUST("CRUST-UI-POST-TOOL-REPLY-" + p.id)))
                r.onclick = function () {
                    _t.replyPost(this.getAttribute("parent_id"))
                };
            if ((d = $CRUST("CRUST-UI-POST-TOOL-DELETE-" + p.id)))
                d.onclick = function () {
                    _t.deletePost(this.getAttribute("post_id"))
                };
            li.onmouseover = function () {
                $CRUST("CRUST-UI-POST-TOOLS-" + p.id).style.visibility = "visible"
            };
            li.onmouseout = function () {
                $CRUST("CRUST-UI-POST-TOOLS-" + p.id).style.visibility = "hidden"
            };
            var e = $CRUST("CRUST-UI-POST-TEXTAREA-" + p.id);
            if (e) {
                e.setAttribute("post_id", p.id);
                e.r = $CRUST("CRUST-UI-POST-CONTAINER-" + p.id);
                e.b = $CRUST("CRUST-UI-POST-SAVE-" + p.id);
                e.s = $CRUST("CRUST-UI-POST-SAVE-STATUS-" + p.id);
                e.c = $CRUST("CRUST-UI-POST-AUTHOR-" + p.id);
                this.editors.push(e);
                e.onfocus = function () {
                    this.style.overflow = "auto";
                    this.className = "CRUST-UI-POST-TEXTAREA-ON";
                    this.r.className = "CRUST-UI-POST-CONTAINER-ON";
                    this.b.style.display = "";
                    this.c.style.display = "none";
                    this.setAttribute("def", this.value);
                    _t.fire("focus")
                },
                e.onblur = function () {
                    this.style.overflow = "hidden";
                    this.className = "CRUST-UI-POST-TEXTAREA";
                    this.r.className = "CRUST-UI-POST-CONTAINER";
                    this.b.style.display = "none";
                    this.c.style.display = "";
                    if (this.value != this.getAttribute("def") && !_t.requesting)
                        _t.editPost(this);
                    _t.fire("blur")
                };
                var b = $CRUST("CRUST-UI-POST-SAVE-BUTTON-" + p.id);
                if (b) {
                    b.r = e;
                    b.onclick = function () {
                        _t.requesting = true;
                        _t.editPost(this.r)
                    }
                }
                $CRUST("CRUST-UI-POST-CONTENTS-" + p.id).style.display = "none"
            }
        } catch (e) {
            this.log(e)
        }
    },
    draw: function () {
        try {
            var _t = this,
            uid = this.uid = this.h.uid;
            this.width = this.option("postWindowWidth");
            var t = document.createElement("div");
            t.innerHTML = CrustUI.getHtml("note").replace(/\{ID\}/g, uid);
            var c = this.c = this.p.appendChild(t.firstChild);
            var t = document.createElement("div");
            t.innerHTML = CrustUI.getHtml("shadow").replace(/\{ID\}/g, uid);
            if (!CrustEnv.isIE6()) {
                var s = this.shadow = this.p.appendChild(t.firstChild);
                this.shadowbody = $CRUST("CRUST-UI-NOTE-SHADOW-BODY-" + uid)
            }
            this.list = $CRUST("CRUST-UI-NOTE-POSTS-" + uid);
            for (var i = 0, posts = this.data.posts, len = posts.length; i < len; i++)
                this.addPost(posts[i]);
            c.style.position = "absolute";
            if (s)
                s.style.zIndex = this.depth_s = this.blank ? CrustDepth.getMax() : CrustDepth.getPostWindow();
            c.style.zIndex = this.depth = this.blank ? CrustDepth.getMax() + 1 : CrustDepth.getPostWindow();
            c.onclick = function () {
                _t.fire("open", {
                    obj: _t
                })
            };
            this.h_c = $CRUST("CRUST-UI-NOTE-HEADER-CENTER-" + uid);
            var d = this.msg("EDITOR_DEFAULT_TEXT");
            this.e = $CRUST("CRUST-UI-EDITOR-" + uid);
            if (this.e) {
                if (!this.authorized() && this.data.is_private == false) {
                    this.e.value = this.msg("HELP_LOGIN_TO_POST_PUBLIC");
                    CrustElement.addClass(this.e, "CRUST-UI-EDITOR-INACTIVE");
                    this.e.onclick = function () {
                        _t.fire("needLogin")
                    }
                } else {
                    this.editorBody = this.e.parentNode;
                    this.e.value = d;
                    this.e.setAttribute("defaultText", d);
                    this.e.setAttribute("parent_id", 0);
                    this.e.style.height = "40px";
                    this.e.onfocus = function () {
                        this.className = "CRUST-UI-POST-TEXTAREA-ON";
                        this.ref.style.visibility = "visible";
                        if (this.value == this.getAttribute("defaultText"))
                            this.value = "";
                        CrustElement.addClass(this.parentNode, "CRUST-UI-NOTE-BACKCOLOR-ON");
                        CrustElement.addClass(this.ref, "CRUST-UI-NOTE-BACKCOLOR-ON");
                        _t.fire("focus")
                    };
                    this.e.onblur = function () {
                        this.className = "CRUST-UI-POST-TEXTAREA";
                        this.ref.style.visibility = "hidden";
                        CrustElement.removeClass(this.parentNode, "CRUST-UI-NOTE-BACKCOLOR-ON");
                        CrustElement.removeClass(this.ref, "CRUST-UI-NOTE-BACKCOLOR-ON");
                        _t.fire("blur");
                        if (!_t.requesting)
                            _t.sendPost()
                    };
                    if (this.blank) {
                        this.e.onkeypress = function (ev) {
                            if ((ev || event).keyCode == CrustKey.TAB) {
                                _t.focusTag();
                                CrustEvent.stop(ev)
                            }
                        }
                    }
                    this.e.style.width = "100%";
                    var b = document.createElement("div");
                    b.innerHTML = '' + '<div style="height:17px !important;padding:0 !important;margin:0 !important;visibility:hidden">' + '<button title="' + (this.msg(this.data.is_private ? "TOOLTIP_BUTTON_SAVE_AS_PRIVATE" : "TOOLTIP_BUTTON_SAVE_AS_PUBLIC")) + '" type="button" class="CRUST-UI-POST-BUTTON-SAVE">' + this.msg("TOOLTIP_BUTTON_SAVE_AS_PRIVATE") + '</button>' + '</div>';
                    this.b = this.editorBody.appendChild(b.firstChild);
                    this.b.onclick = function () {
                        _t.requesting = true;
                        _t.sendPost()
                    };
                    this.e.ref = this.b
                }
            }
            this.trigger = $CRUST("CRUST-UI-POSTWINDOW-TRIGGER-" + uid);
            this.trigger.onmouseover = function () {
                CrustElement.addClass(this, "CRUST-UI-POSTWINDOW-TRIGGER-OVER")
            };
            this.trigger.onmouseout = this.trigger.onmouseup = function (evt) {
                CrustElement.removeClass(this, "CRUST-UI-POSTWINDOW-TRIGGER-DOWN");
                CrustElement.removeClass(this, "CRUST-UI-POSTWINDOW-TRIGGER-OVER");
                CrustEvent.stop(evt)
            };
            this.trigger.onmousedown = function (evt) {
                CrustElement.addClass(this, "CRUST-UI-POSTWINDOW-TRIGGER-DOWN");
                CrustEvent.stop(evt)
            };
            this.trigger.onclick = function (evt) {
                _t.fire("open", {
                    obj: _t
                });
                _t.showTool();
                CrustEvent.stop(evt)
            };
            this.tool = $CRUST("CRUST-UI-POSTWINDOW-TOOLS-" + uid);
            this.tool.onmouseover = function () {
                if (this.timer)
                    window.clearTimeout(this.timer)
            };
            var s = $CRUST("CRUST-UI-POSTWINDOW-CLOSE-" + uid);
            s.onmouseover = function () {
                CrustElement.addClass(this, "CRUST-UI-POSTWINDOW-CLOSE-OVER")
            };
            s.onmouseout = s.onmouseup = function (ev) {
                CrustElement.removeClass(this, "CRUST-UI-POSTWINDOW-CLOSE-OVER");
                CrustElement.removeClass(this, "CRUST-UI-POSTWINDOW-CLOSE-DOWN")
            };
            s.onmousedown = function (e) {
                CrustElement.addClass(this, "CRUST-UI-POSTWINDOW-CLOSE-DOWN");
                CrustEvent.stop(e)
            };
            s.onclick = function (e) {
                _t.hide();
                CrustEvent.stop(e)
            };
            this.drawMenu();
            this.tag = $CRUST("CRUST-UI-NOTE-TAG-" + uid);
            if (this.option("enableTag")) {
                var t = [],
                l;
                if (this.data.tags && this.data.tags.length) {
                    for (var i = 0; i < this.data.tags.length; i++)
                        t.push(this.data.tags[i]);
                    l = this.parseTags(t, false, ', ')
                } else if (this.data.user_id == this.userID())
                    l = "";
                else
                    this.tag.style.display = "none";
                if (this.data.user_id == this.userID() && this.authorized()) {
                    this.tag.innerHTML = "" + '<button title="' + this.msg("TOOLTIP_TAG_EDIT") + '" id="CRUST-UI-NOTE-TAG-EDIT-' + uid + '" class="CRUST-UI-NOTE-TAG-EDIT" type="button"></button>' + '<div id="CRUST-UI-NOTE-TAG-LIST-' + uid + '" class="CRUST-UI-NOTE-TAG-LIST">' + l + '</div>' + '<input id="CRUST-UI-NOTE-TAG-INPUT-' + uid + '" style="display:none" class="CRUST-UI-NOTE-TAG-INPUT-ON" type="text" value="' + t.join(", ") + '"/>';
                    this.tag.r1 = $CRUST("CRUST-UI-NOTE-TAG-LIST-" + uid);
                    this.tag.r2 = $CRUST("CRUST-UI-NOTE-TAG-INPUT-" + uid);
                    this.tag.r5 = $CRUST("CRUST-UI-NOTE-TAG-EDIT-" + uid);
                    this.tag.r2.onblur = function (e) { {
                            _t.fire("tag", {
                                sender: _t,
                                id: _t.data.id,
                                tags: _t.tag.r2.value
                            })
                        }
                        _t.updateShadow()
                    };
                    this.tag.r2.onkeypress = function (e) {
                        switch ((e || event).keyCode) {
                        case CrustKey.ESCAPE:
                            window.setTimeout(function () {
                                _t.tag.r2.value = _t.parseTags(_t.data.tags, true, ' ');
                                _t.tag.r2.style.display = "none";
                                _t.tag.r1.style.display = "";
                                _t.updateShadow()
                            }, 10);
                            CrustEvent.stop(e);
                            break;
                        case CrustKey.ENTER:
                            _t.fire("tag", {
                                sender: _t,
                                id: _t.data.id,
                                tags: _t.tag.r2.value
                            });
                            CrustEvent.stop(e);
                            break
                        }
                    };
                    this.tag.r5.onclick = function () {
                        _t.tag.r2.style.display = "";
                        _t.tag.r1.style.display = "none";
                        if (_t.tag.r2.value != _t.msg("HELP_NO_TAG"))
                            _t.tag.r2.select();
                        else
                            _t.tag.r2.value = "";
                        _t.tag.r2.focus();
                        _t.updateShadow()
                    };
                    if (this.data.tags && this.data.tags.length == 0) {
                        this.tag.r1.style.cursor = "pointer";
                        this.tag.r1.onclick = this.tag.r5.onclick
                    }
                } else {
                    if (this.data.tags && this.data.tags.length)
                        this.tag.innerHTML = '<div id="CRUST-UI-NOTE-TAG-LIST-' + uid + '" class="CRUST-UI-NOTE-TAG-LIST">' + l + '</div>';
                    else
                        $CRUST("CRUST-UI-NOTE-TAG-CONTAINER-" + uid).style.display = "none"
                }
            } else
                $CRUST("CRUST-UI-NOTE-TAG-CONTAINER-" + uid).style.display = "none";
            this.bar = $CRUST("CRUST-UI-NOTE-FLEXBAR-" + uid);
            this.title = $CRUST("CRUST-UI-POSTWINDOW-TITLE-" + uid);
            this.gripper = $CRUST("CRUST-UI-NOTE-GRIPPER-" + uid);
            this.gripper.style.left = "12px";
            this.gripper.style.top = "-12px";
            this.grback = $CRUST("CRUST-UI-NOTE-GRIPPER-BACK-" + uid);
            this.shback = $CRUST("CRUST-UI-NOTE-SHADOW-BOTTOM-RIGHT-" + uid);
            this.foot = $CRUST("CRUST-UI-NOTE-FOOTER-" + uid);
            this.foot.style.width = (this.width - 12) + "px";
            this.bar.style.width = (this.width - 12) + "px";
            this.h_c.style.width = (this.width - (CrustEnv.isIE6() ? 60 : 55)) + "px";
            this.updatePosition();
            this.setTitle();
            this.activated = true;
            if (!this.data.is_private)
                this.c.className = (this.g_id && this.g_id != LemonPen.PUBLIC_GROUP) ? "CRUST-UI-GNOTE" : "CRUST-UI-PNOTE";
            CrustDrag.init($CRUST("CRUST-UI-NOTE-HEADER-CONTAINER-" + uid), this, this.c);
            this.updateGripper();
            if (this.blank) {
                this.trigger.parentNode.removeChild(this.trigger);
                var a = $CRUST("CRUST-UI-POSTWINDOW-CLOSE-" + uid);
                if (a)
                    a.onclick = function () {
                        _t.destroy()
                    };
                this.tag.style.display = "none"
            }
        } catch (err) {
            this.log(e)
        }
    },
    isGroup: function () {
        return !this.isPrivate() && this.g_id != LemonPen.PUBLIC_GROUP
    },
    isPublic: function () {
        return !this.isPrivate() && this.g_id == LemonPen.PUBLIC_GROUP
    },
    isPrivate: function () {
        return this.data.is_private
    },
    groupChanged: function (r) {
        if (this.isGroup())
            return;
        if (this.activated)
            this.drawMenu()
    },
    drawMenu: function () {
        var _t = this;
        var uid = this.uid;
        var tp,
        td,
        tg,
        ts,
        tm,
        tx,
        te;
        $CRUST("CRUST-UI-POSTWINDOW-TOOL-CLOSE-" + uid).onclick = function () {
            _t.hide()
        };
        $CRUST("CRUST-UI-POSTWINDOW-TOOL-CLOSE-EXCLUSIVE-" + uid).onclick = function () {
            _t.hideTool();
            _t.fire("closeExclusive", {
                obj: _t.h
            })
        };
        (tm = $CRUST("CRUST-UI-POSTWINDOW-TOOL-NOSHARE-" + uid)).onclick = function () {
            _t.noShare()
        };
        if ((te = $CRUST("CRUST-UI-POSTWINDOW-TOOL-EXPORT-" + uid))) {
            if (this.option("enableExport"))
                te.onclick = function () {
                    _t.exportToBlog()
                };
            else
                CrustElement.addClass(te, "CRUST-UI-POSTWINDOW-TOOL-DISABLED")
        }
        if ((tp = $CRUST("CRUST-UI-POSTWINDOW-TOOL-MAKEPUBLIC-" + uid))) {
            if (this.data.user_id == this.userID() && this.authorized()) {
                tp.onclick = function () {
                    if (_t.g_id == LemonPen.PUBLIC_GROUP)
                        return;
                    _t.hideTool();
                    _t.showGroups()
                }
            }
        }
        var bGroup = this.authorized() && this.groups().length > 0;
        var ts = $CRUST("CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-ARROW-" + uid);
        var tx = $CRUST("CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-" + uid);
        if (bGroup) {
            ts.onclick = function () {
                CrustElement.addClass(tx, "CRUST-UI-POSTWINDOW-TOOL-NONE");
                _t.toggleGroupList()
            };
            tx.onclick = function (ev) {
                var b = _t.eventInClass(ev || event, "CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-ARROW");
                if (_t.isGroup() || b)
                    return;
                _t.share(parseInt(_t.activeGroup().id))
            }
        } else {
            CrustElement.addClass(ts, "CRUST-UI-HIDDEN");
            CrustElement.addClass(tx, "CRUST-UI-POSTWINDOW-TOOL-DISABLED")
        }
        if ((tg = $CRUST("CRUST-UI-POSTWINDOW-GROUPS-" + uid))) {
            while (tg.hasChildNodes())
                tg.removeChild(tg.childNodes[0]);
            var gs = this.groups();
            this.g_list = tg;
            if (gs.length) {
                for (var i = 0; i < gs.length; i++) {
                    if (gs[i].id == 1 || gs[i].id == 2 || gs[i].id == this.activeGroup().id)
                        continue;
                    var g = document.createElement("a");
                    if (i == gs.length - 1)
                        g.className = "CRUST-UI-POSTWINDOW-GROUPS-LAST";
                    g.innerHTML = this.msg("MENU_POSTWINDOW_SHAREGROUP").replace(/#\{GROUP\}/, gs[i].name);
                    g.href = "javascript:void(0)";
                    g.group_id = gs[i].id;
                    g.onclick = function () {
                        _t.share(parseInt(this.group_id))
                    };
                    tg.appendChild(g)
                }
            }
        }
        if ((td = $CRUST("CRUST-UI-POSTWINDOW-TOOL-DELETE-" + uid))) {
            td.onclick = function () {
                _t.hideTool();
                _t.fire("delete", {
                    sender: _t,
                    id: _t.data.id,
                    type: _t.type
                })
            }
        }
        if (this.data.user_id != this.userID())
            te.className = td.className = tp.className = tm.className = ts.className = tx.className = "CRUST-UI-HIDDEN";
        if (!this.authorized()) {
            CrustElement.addClass(tm, "CRUST-UI-POSTWINDOW-TOOL-SELECTED");
            CrustElement.addClass(tx, "CRUST-UI-POSTWINDOW-TOOL-DISABLED");
            CrustElement.addClass(tp, "CRUST-UI-POSTWINDOW-TOOL-DISABLED");
            CrustElement.addClass(ts, "CRUST-UI-HIDDEN");
            tx.onclick = tp.onclick = function () {
                _t.needLogin()
            };
            tx.innerHTML = this.msg("MENU_POSTWINDOW_SHAREGROUP").replace(/#\{GROUP\}/, "")
        } else if (this.data.user_id == this.userID()) {
            var fg = this.activeGroup();
            var fh = "";
            if (fg) {
                fh = this.msg("MENU_POSTWINDOW_SHAREGROUP").replace(/#\{GROUP\}/, fg.name);
                tx.innerHTML = fh
            } else {
                tx.innerHTML = this.msg("MENU_POSTWINDOW_SHAREGROUP").replace(/#\{GROUP\}/, "")
            }
            CrustElement.removeClass(tm, "CRUST-UI-POSTWINDOW-TOOL-SELECTED");
            CrustElement.removeClass(tp, "CRUST-UI-POSTWINDOW-TOOL-SELECTED");
            CrustElement.removeClass(tx, "CRUST-UI-POSTWINDOW-TOOL-SELECTED");
            if (this.data.is_private) {
                CrustElement.addClass(tm, "CRUST-UI-POSTWINDOW-TOOL-SELECTED")
            } else if (this.g_id == LemonPen.PUBLIC_GROUP) {
                CrustElement.addClass(tp, "CRUST-UI-POSTWINDOW-TOOL-SELECTED")
            } else {
                tx.innerHTML = this.msg("MENU_POSTWINDOW_SHAREGROUP").replace(/#\{GROUP\}/, this.g_name);
                CrustElement.addClass(tx, "CRUST-UI-POSTWINDOW-TOOL-SELECTED")
            }
        }
    },
    updateGripper: function () {
        var w = CrustElement.width(this.c);
        var h = CrustElement.height(this.c);
        CrustDrag.init(this.gripper, this, null, (this.option("postWindowMinWidth") - w), (this.option("postWindowMaxWidth") - w), 100 - h, null)
    },
    setTitle: function () {
        if (!this.title)
            return;
        var m = "";
        if (this.blank)
            m = this.msg(this.authorized() ? "STATUS_POSTWINDOW_BLANK_LOGGED" : "STATUS_POSTWINDOW_BLANK");
        else if (this.data.is_private)
            m = this.msg(this.authorized() ? "STATUS_POSTWINDOW_PRIVATE" : "STATUS_POSTWINDOW_GUEST");
        else if (this.g_id && this.g_id != LemonPen.PUBLIC_GROUP)
            m = this.msg("STATUS_POSTWINDOW_GROUP");
        else
            m = this.msg("STATUS_POSTWINDOW_PUBLIC");
        var h = m.replace(/#\{author\}/, this.data.user_name).replace(/#\{number_of_posts\}/, this.data.number_of_posts).replace(/#\{group\}/, this.g_name).replace(/#\{created\}/, this.data.created);
        this.title.innerHTML = h
    },
    showGroups: function () {
        if (this.g == null) {
            var t = this;
            var h = [];
            var g = this.g = document.createElement("div");
            g.style.cssText = "padding:10px";
            var r = this.groups();
            h.push('<div class="CRUST-UI-SHAREHELP">');
            h.push('<div class="CRUST-UI-SHAREHELP-MESSAGE">' + this.msg("HELP_MAKE_PUBLIC") + '</div>');
            h.push('<br/>');
            h.push('<button id="CRUST-UI-SHARE-' + this.uid + '" class="CRUST-UI-SHARE" title="' + this.msg("MENU_POSTWINDOW_MAKEPUBLIC") + '"></button>');
            h.push('<button id="CRUST-UI-SHARE-CANCEL-' + this.uid + '" class="CRUST-UI-SHARE-CANCEL" title="' + this.msg("DIALOG_CANCEL") + '"></button>');
            h.push('</div>');
            g.innerHTML = h.join("");
            this.list.parentNode.insertBefore(g, this.list);
            $CRUST("CRUST-UI-SHARE-" + this.uid).onclick = function () {
                t.share(1)
            };
            $CRUST("CRUST-UI-SHARE-CANCEL-" + this.uid).onclick = function () {
                t.hideGroups()
            }
        }
        this.g.style.display = "";
        this.updateShadow()
    },
    hideGroups: function () {
        if (this.g)
            this.g.style.display = "none";
        this.updateShadow()
    },
    exportToBlog: function () {
        this.fire("export", {
            sender: this,
            id: this.data.id
        })
    },
    share: function (g) {
        this.hideTool();
        this.fire("public", {
            sender: this,
            id: this.data.id,
            group_id: g
        })
    },
    noShare: function () {
        this.hideTool();
        this.fire("private", {
            sender: this,
            id: this.data.id
        })
    },
    onDrag: function (e, x, y) {
        if (e == this.gripper) {
            var p = CrustPosition.absolute(this.gripper);
            this.sizer.style.width = (p[0] + 6) + "px";
            this.sizer.style.height = (p[1] + 6) + "px"
        } else if (e.root == this.c) {
            if (this.shadow)
                this.shadow.style.display = "none";
            this.c.style.zIndex = CrustDepth.getMax();
            if (this.type == "highlight" && this.option("enableMatchingLine")) {
                if (this.h && !CrustEnv.isIE()) {
                    if (!this.m) {
                        var t = document.createElement("div");
                        t.innerHTML = CrustUI.getHtml("line");
                        this.m = this.p.appendChild(t.firstChild)
                    }
                    var o = this.m;
                    this.h.c.style.display = "";
                    var pos = CrustPosition.cumulative(this.h.c);
                    var pos2 = CrustPosition.cumulative(this.c);
                    var ctx = o.getContext("2d");
                    ctx.globalAlpha = 0.5;
                    pos[0] += CrustElement.width(this.h.c) / 2;
                    pos[1] += CrustElement.height(this.h.c) / 2;
                    pos2[0] += CrustElement.width(this.c) / 2;
                    pos2[1] += CrustElement.height(this.c) / 2;
                    var x1 = pos[0];
                    var y1 = pos[1];
                    var x2 = pos2[0];
                    var y2 = pos2[1];
                    var nDim,
                    x,
                    y;
                    if (x2 > x1)
                        nDim = y2 > y1 ? 4 : 1;
                    else
                        nDim = y2 > y1 ? 3 : 2;
                    var w = Math.abs(pos[0] - pos2[0]);
                    var h = Math.abs(pos[1] - pos2[1]);
                    var arr1,
                    arr2;
                    if (nDim) {
                        switch (nDim) {
                        case 1:
                            x = x1;
                            y = y2;
                            arr1 = [0, h];
                            arr2 = [w, 0];
                            break;
                        case 2:
                            x = x1 - w;
                            y = y1 - h;
                            arr1 = [w, h];
                            arr2 = [0, 0];
                            break;
                        case 3:
                            x = x1 - w;
                            y = y1;
                            arr1 = [w, 0];
                            arr2 = [0, h];
                            break;
                        case 4:
                            x = x1;
                            y = y1;
                            arr1 = [0, 0];
                            arr2 = [w, h];
                            break
                        }
                        o.style.left = x + "px";
                        o.style.top = y + "px";
                        o.width = w;
                        o.height = h;
                        o.style.display = "";
                        o.style.zIndex = CrustDepth.getMax() - 2;
                        ctx.strokeStyle = "#aaa";
                        ctx.lineWidth = 3;
                        ctx.beginPath();
                        ctx.moveTo(arr1[0], arr1[1]);
                        ctx.lineTo(arr2[0], arr2[1]);
                        ctx.stroke()
                    }
                }
            }
        }
    },
    onDragStart: function (e, x, y) {
        this.hideTool();
        if (e == this.gripper) {
            if (!this.sizer) {
                var c = this.sizer = document.createElement("div");
                c.className = "CRUST-UI-NOTE-RESIZABLE";
                c.style.position = "absolute";
                c.style.zIndex = CrustDepth.getMax();
                this.p.appendChild(c)
            }
            var p = this.getPosition();
            var t = CrustPosition.absolute(this.gripper);
            with (this.sizer.style) {
                left = p[0] + "px";
                top = p[1] + "px";
                width = (t[0] + 6) + "px";
                height = (t[1] + 6) + "px";
                display = ""
            }
            this.grback.className = "CRUST-UI-NOTE-GRIPPER-BACK-ON";
            if (this.shback)
                this.shback.className = "CRUST-UI-NOTE-SHADOW-BOTTOM-RIGHT-ON"
        } else if (e.root == this.c) {
            this.oX = parseInt(this.c.style.left);
            this.oY = parseInt(this.c.style.top)
        }
    },
    onDragEnd: function (e, x, y) {
        if (e.root == this.c) {
            if (this.oX == x && this.oY == y)
                return;
            if (this.m)
                this.m.style.display = "none";
            this.h.moveTo(x, y);
            this.updateShadow()
        } else if (e == this.gripper) {
            var w;
            this.c.style.width = (w = parseInt(this.sizer.style.width) + 3) + "px";
            this.foot.style.width = (w - 11) + "px";
            this.bar.style.width = (w - 11) + "px";
            this.sizer.style.display = "none";
            this.h_c.style.width = (w - 55) + "px";
            this.gripper.style.left = "12px";
            this.gripper.style.top = "-12px";
            this.updateGripper();
            this.updateEditors();
            this.updateShadow();
            this.grback.className = "CRUST-UI-NOTE-GRIPPER-BACK";
            if (this.shback)
                this.shback.className = "CRUST-UI-NOTE-SHADOW-BOTTOM-RIGHT"
        }
    },
    onDocClick: function (e) {
        if (!this.eventInClass(e, "CRUST-UI-POSTWINDOW-TOOLS"))
            this.hideTool()
    },
    showTool: function () {
        this.tool.style.display = "";
        CrustElement.addClass(this.trigger, "CRUST-UI-POSTWINDOW-TRIGGER-ON");
        var p = CrustPosition.cumulative(this.trigger);
        if (CrustEnv.isIE() || CrustEnv.isOpera()) {
            var q = CrustPosition.cumulative(this.c);
            p[0] -= q[0];
            p[1] -= q[1];
            p[1] -= 1
        }
        this.tool.style.left = p[0] + "px";
        this.tool.style.top = (p[1] + 16) + "px";
        CrustEvent.listenEvent(this.p, "click", this, "onDocClick");
        if (this.timer)
            window.clearTimeout(this.timer)
    },
    hideTool: function () {
        if (!this.tool)
            return;
        CrustEvent.stopListen(this.p, "click", this, "onDocClick");
        this.tool.style.display = "none";
        CrustElement.removeClass(this.trigger, "CRUST-UI-POSTWINDOW-TRIGGER-ON");
        CrustElement.removeClass(this.trigger, "CRUST-UI-POSTWINDOW-TRIGGER-DOWN");
        CrustElement.removeClass(this.trigger, "CRUST-UI-POSTWINDOW-TRIGGER-OVER");
        this.hideGroupList();
        if (this.timer)
            window.clearTimeout(this.timer)
    },
    toggleGroupList: function () {
        this[this.g_list.style.display != "none" ? "hideGroupList" : "showGroupList"]()
    },
    showGroupList: function () {
        var o;
        this.g_list.style.display = "block";
        if ((o = $CRUST("CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-ARROW-" + this.uid)))
            o.innerHTML = "▲"
    },
    hideGroupList: function () {
        var o;
        if (this.g_list)
            this.g_list.style.display = "none";
        if ((o = $CRUST("CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-ARROW-" + this.uid)))
            o.innerHTML = "▼"
    },
    updatePosition: function () {
        this.c.style.left = this.h.c.posX + "px";
        this.c.style.top = this.h.c.posY + "px"
    },
    getPosition: function () {
        return [parseInt(this.c.style.left), parseInt(this.c.style.top)]
    },
    updateShadow: function () {
        var c;
        if ((c = this.shadow)) {
            var _this = this;
            c.style.left = "0px";
            c.style.top = "0px";
            c.style.width = "10px";
            c.style.height = "10px";
            if (this.visible() == false) {
                if (this.shadow)
                    this.shadow.style.display = "none";
                return
            }
            var w = CrustElement.width(this.c);
            var h = CrustElement.height(this.c);
            var pos = CrustPosition.absolute(this.c);
            if (w < 0 || h < 0 || isNaN(w) || isNaN(h))
                return;
            c.style.left = pos[0] + "px";
            c.style.top = pos[1] + "px";
            c.style.width = (w + 5) + "px";
            if (this.shadow) {
                if (CrustEnv.isIE())
                    this.shadowbody.style.height = (h - 55) + "px";
                else
                    this.shadowbody.style.height = (h - 30 - 12 - 13) + "px";
                this.shadow.style.display = ""
            }
        }
    },
    adjustPosition: function () {
        try {
            var p = CrustUtil.getClientRect(),
            w = CrustElement.width(this.c);
            var x = parseInt(this.c.style.left);
            if (x + w > p[0]) {
                do {
                    x -= 2
                } while (x + w > p[0]);
                x -= 10;
                this.c.style.left = x + "px";
                this.updateShadow()
            }
        } catch (e) {
            this.log(e)
        }
    },
    show: function (b, f) {
        try {
            if (!this.activated)
                this.draw();
            this.c.style.display = "";
            this.h.hide();
            this.updateEditors();
            this.updatePosition();
            this.updateShadow();
            if (b)
                this.fire("activate", {
                    obj: this
                });
            else
                this.fire("open", {
                    obj: this
                });
            if (f)
                this.e.focus();
            this.adjustPosition()
        } catch (e) {
            this.log(e)
        }
    },
    _hide: function () {
        var t = this;
        this.hideTool();
        this.hideGroups();
        window.setTimeout(function () {
            if (t.c)
                t.c.style.display = "none";
            if (t.shadow)
                t.shadow.style.display = "none"
        }, 5)
    },
    hide: function () {
        this._hide();
        if (this.h)
            this.h.show()
    },
    filtered: function (h) {
        if (h)
            this._hide()
    },
    destroy: function () {
        if (this.c)
            this.c.parentNode.removeChild(this.c);
        if (this.shadow)
            this.shadow.parentNode.removeChild(this.shadow);
        if (this.blank)
            this.h.destroy()
    },
    visible: function () {
        if (!this.activated)
            return false;
        return this.c.style.display != "none"
    },
    needLogin: function () {
        this.fire("needLogin");
        this.hideTool()
    },
    focusTag: function () {
        try {
            if (this.tag) {
                this.tag.r2.style.display = "";
                this.tag.r2.focus()
            }
        } catch (e) {
            this.log(e)
        }
    },
    sendPostWithTags: function () {
        this.sendPost()
    },
    sendPost: function () {
        var b = false;
        var d = CrustUtil.trim(this.e.value);
        if (this.blank)
            b = true;
        else
            b = (d != "");
        var p = CrustPosition.absolute(this.c);
        if (b) {
            this.requesting = true;
            this.fire(this.blank ? "sendNote" : "sendPost", {
                position: p,
                sender: this,
                id: this.data.id,
                contents: d,
                parent_no: parseInt(this.e.getAttribute("parent_id")),
                type: this.type
            })
        } else {
            this.requesting = false;
            this.resetEditor()
        }
    },
    editPost: function (e) {
        this.requesting = true;
        e.s.innerHTML = this.msg("STATUS_POST_SAVING");
        e.s.style.display = "";
        e.c.style.display = "none";
        this.fire("editPost", {
            sender: this,
            id: e.getAttribute("post_id"),
            contents: CrustUtil.trim(e.value),
            parent_no: 0,
            crust_type: "note"
        })
    },
    deletePost: function (post_id) {
        this.requesting = true;
        if (!isNaN(post_id) && post_id > 0)
            this.fire("deletePost", {
                sender: this,
                id: post_id,
                type: this.type + "_comment"
            })
    },
    replyPost: function (p) {
        var c = $CRUST("CRUST-UI-POST-TOOL-REPLY-CONTAINER-" + p);
        if (c) {
            c.style.display = "";
            this.e.setAttribute("parent_id", p);
            c.appendChild(this.e);
            c.appendChild(this.e.ref);
            this.e.focus();
            this.updateShadow()
        }
    },
    onDeletePost: function (p) {
        var c = $CRUST("CRUST-UI-POST-" + p.id);
        if (c) {
            if (parseInt(p.virtual_deleted) == 1) {
                var a = $CRUST("CRUST-UI-POST-CONTENTS-" + p.id);
                var b = $CRUST("CRUST-UI-POST-TEXTAREA-" + p.id);
                for (var i = 0; i < this.editors.length; i++) {
                    if (b == this.editors[i])
                        this.editors.splice(i, 1);
                    b.parentNode.removeChild(b);
                    break
                }
                a.innerHTML = '<p style="color:#aaa;font-style:italic">' + this.msg("HELP_POST_VIRTUAL_DELETED") + '</p>';
                a.style.display = ""
            } else {
                c.parentNode.removeChild(c);
                this.h.deletePost()
            }
        }
        this.requesting = false;
        this.updateShadow()
    },
    onSendPost: function (p) {
        this.addPost(p);
        this.resetEditor();
        if (this.h) {
            this.h.addPost(p);
            this.updateEditor($CRUST("CRUST-UI-POST-TEXTAREA-" + p.id))
        }
        this.requesting = false;
        this.updateShadow()
    },
    onUpdatePost: function (p) {
        var o = $CRUST("CRUST-UI-POST-CONTENTS-" + p.id);
        var e = $CRUST("CRUST-UI-POST-TEXTAREA-" + p.id);
        o.innerHTML = "<p>" + this.htmlize(p.contents) + "</p>";
        e.value = this.textize(p.contents);
        e.s.innerHTML = this.msg("STATUS_POST_SAVED");
        e.s.innerHTML = "";
        e.s.style.display = "none";
        e.c.style.display = "";
        this.updateEditor(e);
        this.requesting = false;
        this.updateShadow()
    },
    onPublic: function (d) {
        try {
            this.c.className = "CRUST-UI-PNOTE";
            this.requesting = false;
            if (this.h)
                this.h.onPublic(d);
            this.data.is_private = false;
            this.setTitle();
            this.g_id = d.group_id;
            this.g_name = d.group_name;
            this.data.is_private = false;
            this.drawMenu();
            this.hideTool();
            this.hideGroups();
            this.setTitle()
        } catch (e) {
            this.log(e)
        }
    },
    onGroup: function (d) {
        try {
            this.c.className = "CRUST-UI-GNOTE";
            this.requesting = false;
            if (this.h)
                this.h.onGroup(d);
            this.g_id = d.group_id;
            this.g_name = d.group_name;
            this.data.is_private = false;
            this.drawMenu();
            this.setTitle();
            this.hideTool()
        } catch (e) {
            this.log(e)
        }
    },
    onPrivate: function (d) {
        try {
            this.c.className = "CRUST-UI-NOTE";
            this.requesting = false;
            this.g_id = this.g_name = null;
            this.data.is_private = true;
            if (this.h)
                this.h.onPrivate(d);
            this.drawMenu();
            this.setTitle()
        } catch (e) {
            this.log(e)
        }
    },
    onTagComplete: function (d) {
        var a = this.tag;
        this.data.tags = d.tags;
        a.r1.innerHTML = d.tags.length == 0 ? "" : this.parseTags(this.data.tags, false, ', ');
        a.r2.value = d.tags.length == 0 ? "" : this.parseTags(this.data.tags, true, ' ');
        a.r1.style.display = a.r5.style.display = "";
        a.r2.style.display = "none";
        if (d.tags.length == 0) {
            a.r1.onclick = a.r5.onclick;
            a.r1.style.cursor = "pointer"
        } else {
            a.r1.onclick = null
        }
        this.updateShadow()
    },
    resetEditor: function () {
        this.e.value = "";
        var c = $CRUST("CRUST-UI-POST-TOOL-REPLY-CONTAINER-" + this.e.getAttribute("parent_id"));
        if (c)
            c.style.display = "none";
        this.editorBody.appendChild(this.e);
        this.editorBody.appendChild(this.e.ref);
        this.e.setAttribute("parent_id", 0);
        this.updateShadow()
    },
    updateEditors: function () {
        for (var i = 0; i < this.editors.length; i++)
            this.updateEditor(this.editors[i])
    },
    updateEditor: function (e) {
        var c = e.parentNode.previousSibling;
        c.style.display = "";
        var h = c.offsetHeight;
        h = Math.max(40, h);
        e.style.height = h + "px";
        e.style.overflow = "hidden";
        c.style.display = "none"
    },
    parseTags: function (t, b, s) {
        var u = "";
        for (var i = 0, a = []; i < t.length; i++) {
            u = LemonPen.URL_TAG.replace(/\{TAG\}/, encodeURIComponent(t[i])).replace(/\{LOCALID\}/, this.data.local_id).replace(/\{OPENID\}/, this.data.openid_url);
            a.push(b ? t[i] : '<a title="' + t[i] + '" href="' + u + '">' + t[i] + '</a>')
        }
        return a.join(s)
    },
    htmlize: function (c) {
        return c.replace(/\r?\n/g, "<br/>")
    },
    textize: function (c) {
        return c
    }
});
var CrustDrag = {
    obj: null,
    init: function (o, oListener, oRoot, minX, maxX, minY, maxY, bRight) {
        if (typeof bRight == "undefined")
            bRight = false;
        o.onmousedown = CrustDrag.start;
        o.rmode = bRight;
        o.root = oRoot && oRoot != null ? oRoot : o;
        o.listener = oListener;
        if (bRight) {
            if (isNaN(parseInt(o.root.style.right)))
                o.root.style.right = "0px";
            if (isNaN(parseInt(o.root.style.top)))
                o.root.style.top = "0px"
        } else {
            if (isNaN(parseInt(o.root.style.left)))
                o.root.style.left = "0px";
            if (isNaN(parseInt(o.root.style.top)))
                o.root.style.top = "0px"
        }
        if (o.rmode && isNaN(parseInt(o.root.style.right)))
            o.root.style.right = "0px";
        o.minX = typeof minX != 'undefined' ? minX : null;
        o.minY = typeof minY != 'undefined' ? minY : null;
        o.maxX = typeof maxX != 'undefined' ? maxX : null;
        o.maxY = typeof maxY != 'undefined' ? maxY : null;
        o.root.onDragStart = new Function();
        o.root.onDragEnd = new Function();
        o.root.onDrag = new Function()
    },
    start: function (e) {
        var o = CrustDrag.obj = this;
        e = CrustDrag.fixE(e);
        var y = parseInt(o.root.style.top);
        var x = parseInt(o.rmode ? o.root.style.right : o.root.style.left);
        o.root.onDragStart(x, y);
        o.listener.onDragStart(CrustDrag.obj, x, y);
        o.lastMouseX = e.clientX;
        o.lastMouseY = e.clientY;
        if (o.minX != null)
            o.minMouseX = e.clientX - x + o.minX;
        if (o.maxX != null)
            o.maxMouseX = o.minMouseX + o.maxX - o.minX;
        if (o.minY != null)
            o.minMouseY = e.clientY - y + o.minY;
        if (o.maxY != null)
            o.maxMouseY = o.minMouseY + o.maxY - o.minY;
        document.onmousemove = CrustDrag.drag;
        document.onmouseup = CrustDrag.end;
        return false
    },
    drag: function (e) {
        e = CrustDrag.fixE(e);
        var o = CrustDrag.obj;
        var ey = e.clientY;
        var ex = e.clientX;
        var y = parseInt(o.root.style.top);
        var x = parseInt(o.root.style.left);
        var nx,
        ny;
        if (o.minX != null)
            ex = Math.max(ex, o.minMouseX);
        if (o.maxX != null)
            ex = Math.min(ex, o.maxMouseX);
        if (o.minY != null)
            ey = Math.max(ey, o.minMouseY);
        if (o.maxY != null)
            ey = Math.min(ey, o.maxMouseY);
        nx = x + (ex - o.lastMouseX);
        ny = y + (ey - o.lastMouseY);
        if (!isNaN(nx))
            CrustDrag.obj.root.style.left = nx + "px";
        if (!isNaN(ny))
            CrustDrag.obj.root.style.top = ny + "px";
        CrustDrag.obj.lastMouseX = ex;
        CrustDrag.obj.lastMouseY = ey;
        CrustDrag.obj.root.onDrag(nx, ny);
        CrustDrag.obj.listener.onDrag(CrustDrag.obj, x, y);
        return false
    },
    end: function () {
        document.onmousemove = null;
        document.onmouseup = null;
        var x = parseInt(CrustDrag.obj.root.style[CrustDrag.obj.rmode ? "right" : "left"]);
        var y = parseInt(CrustDrag.obj.root.style.top);
        CrustDrag.obj.root.onDragEnd(x, y);
        CrustDrag.obj.listener.onDragEnd(CrustDrag.obj, x, y);
        CrustDrag.obj = null
    },
    fixE: function (e) {
        if (typeof e == 'undefined')
            e = window.event;
        if (typeof e.layerX == 'undefined')
            e.layerX = e.offsetX;
        if (typeof e.layerY == 'undefined')
            e.layerY = e.offsetY;
        return e
    }
};
var CrustRequest = CrustClass.create();
CrustRequest.INTERVAL = 100;
CrustClass.extend(CrustRequest.prototype, CrustBase.prototype);
CrustClass.extend(CrustRequest.prototype, {
    obj: null,
    callback: null,
    callbacks: {},
    requests: {},
    initialize: function () {
        if (CrustEnv.isGecko())
            CrustRequest.MAX_CHARS = 6000;
        else
            CrustRequest.MAX_CHARS = 1500
    },
    _getRequest: function () {
        var req = null;
        try {
            req = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) {
            req = new XMLHttpRequest()
        } finally {
            return req
        }
    },
    getJSON: function (url, data, obj, callback) {
        this.obj = obj;
        this.callback = callback;
        var uid = CrustUtil.getRandom(15) + new Date().getTime();
        this.callbacks[uid] = {
            obj: obj,
            callback: callback
        };
        url += "?_r=" + Math.random();
        try {
            var req = this._getRequest();
            req.onreadystatechange = function () {
                if (req.readyState == 4) {
                    if (req.status == 200) {
                        var res = eval("var result=" + req.responseText);
                        obj[callback](result)
                    } else {
                        throw (req.responseText)
                    }
                }
            };
            req.open("POST", url, true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
            req.send(data)
        } catch (e) {
            if (true) {
                var _this = this;
                var reqs = [];
                var idx = 0;
                var enc = encodeURIComponent(data);
                var req = "";
                var end = "";
                var offset_start = 0;
                while (true) {
                    req = enc.substr(offset_start, offset_start + CrustRequest.MAX_CHARS);
                    end = req.substr(-10);
                    if (end.indexOf("%") > -1)
                        req = enc.substr(offset_start, offset_start + CrustRequest.MAX_CHARS - 10 + end.indexOf("%"));
                    if (req.length == 0)
                        break;
                    reqs.push(req);
                    offset_start += req.length
                }
                var tot = reqs.length;
                for (var i = 0; i < reqs.length; i++)
                    reqs[i] = url + "&request_id=" + uid + "&part=" + (i + 1) + "&total=" + tot + "&part_data=" + reqs[i];
                if (reqs.length) {
                    this.requests[uid] = reqs;
                    this.insertScript(this.getPart(uid))
                }
            }
        }
    },
    getPart: function (request_id) {
        return this.requests[request_id].shift()
    },
    insertScript: function (src) {
        try {
            window.setTimeout(function () {
                var s = document.createElement("script");
                s.type = "text/javascript";
                s.setAttribute("charset", "UTF-8");
                s.src = src;
                document.body.appendChild(s)
            }, 10)
        } catch (e) {}
    },
    onPartComplete: function (request_id, part) {
        this.insertScript(this.getPart(request_id))
    },
    onComplete: function (r, request_id) {
        try {
            if (request_id) {
                var d = this.callbacks[request_id];
                if (d && typeof d.obj[d.callback] == "function")
                    d.obj[d.callback](r)
            } else
                this.obj[this.callback](r)
        } catch (e) {}
    }
});
var CrustUI = CrustClass.create();
CrustClass.extend(CrustUI, CrustBase.prototype);
CrustClass.extend(CrustUI, {
    html: {},
    initialize: function () {
        this.prepareToolbar();
        this.preparePostWindow(this.option("postWindowWidth"));
        this.prepareShadow(this.option("postWindowWidth"));
        this.prepareTaker();
        this.prepareNeedLogin();
        this.prepareTrigger();
        if (this.option("enableMatchingLine"))
            this.prepareLine()
    },
    getHtml: function (s) {
        return this.html[s] || ""
    },
    prepareTrigger: function () {
        var h = '<div title="' + this.msg("HELP_CLOSED_BETA_PLAIN") + '" id="CRUST-UI-TRIGGER" class="' + (CrustEnv.isIE6() ? 'CRUST-UI-TRIGGER-GIF' : 'CRUST-UI-TRIGGER-PNG') + '"></div>';
        this.html.trigger = h
    },
    prepareToolbar: function () {
        var h = '<div id="CRUST-UI-TOOLBAR" style="top:-1000px;display:none">';
        if (this.option("enableOpenID")) {
            h += '<div id="CRUST-UI-LOGIN" style="display:none" class="' + (this.authorized() ? "CRUST-UI-LOGIN-LOGGED" : "") + '">' + '<div style="display:' + (this.authorized() ? "none" : "") + '" id="CRUST-UI-LOGIN-NOT-LOGGED">' + '<form target="_top" method="post" action="' + LemonPen.URL_LOGIN + '">' + '<input type="text" id="CRUST-UI-LOGIN-INPUT" name=""/>' + '<input type="hidden" name="referer_url" value="' + (top.document.location.toString()) + '"/>' + '<input type="hidden" id="remember_me" name="remember_me" value="y"/>' + '<input type="image" id="CRUST-UI-LOGIN-BUTTON" border="0" src="' + LemonPen.URL_IMAGE + '/button_login.png" value=""/>' + '</form>' + '</div>' + '<div style="display:' + (this.authorized() ? "" : "none") + '" id="CRUST-UI-LOGIN-LOGGED">' + '<div id="CRUST-UI-LOGIN-LOGGED-MESSAGE">' + this.msg('OPENID_LOGGED_AS') + '</div>' + '<div id="CRUST-UI-LOGIN-LOGGED-OPENID"><a href="' + this.openID() + '">' + this.openID() + '</a></div>' + '<form target="_top" method="post" action="' + LemonPen.URL_LOGOUT + '">' + '<input type="hidden" name="referer_url" value="' + top.document.location.toString() + '"/>' + '<div style="text-align:left !important">' + '<a href="' + LemonPen.URL_SCRAPBOOK.replace(/\{LOCALID\}/, this.localID()) + '" id="CRUST-UI-SCRAPBOOK-BUTTON" title="' + this.msg("SCRAPBOOK") + '"></a>' + '<input id="CRUST-UI-LOGOUT-BUTTON" type="image" src="' + LemonPen.URL_IMAGE + '/button_logout.png" border="0" value=""/>' + '</div>' + '</form>' + '</div>' + '</div>'
        }
        h += '<div id="CRUST-UI-TOOLBAR-BUTTON-OFF-SHRINKED" style="display:none"><a onfocus="this.blur()" href="javascript:void(0)"></a></div>' + '<div id="CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEMS" style="display:none;padding:4px 2px 4px 2px !important">' + '<table cellspacing="0" cellpadding="0">' + '<col/><col width="18"/>' + '<tr><td colspan="2"><a id="CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-EXPANDALL" onfocus="this.blur()" href="javascript:void(0)">' + this.msg("MENU_TOOLBAR_EXPANDALL") + '</a></td></tr>' + '<tr><td colspan="2"><a id="CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SHRINKALL" onfocus="this.blur()" href="javascript:void(0)">' + this.msg("MENU_TOOLBAR_SHRINKALL") + '</a></td></tr>' + '<tr><td colspan="2"><a id="CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-NOSHARE" href="javascript:void(0)">' + this.msg("MENU_TOOLBAR_NOSHARE") + '</a></td></tr>' + '<tr id="CRUST-UI-TOOLBAR-BUTTON-VIEW-GROUPS-CONTAINER">' + '<td><a id="CRUST-UI-TOOLBAR-BUTTON-VIEW-GROUPS" href="javascript:void(0)">' + this.msg("MENU_TOOLBAR_SHOWGROUP") + '</a></td>' + '<td><span id="CRUST-UI-TOOLBAR-BUTTON-VIEW-GROUPS-ARROW">▼</span></td>' + '</tr>' + '<tr><td colspan="2" id="CRUST-UI-TOOLBAR-GROUPS" style="display:none"></td></tr>' + '<tr><td colspan="2"><a id="CRUST-UI-TOOLBAR-BUTTON-VIEW-ITEM-SHOWALL" href="javascript:void(0)">' + this.msg("MENU_TOOLBAR_SHOWALL") + '</a></td></tr>' + '</table>' + '</div>' + '<div id="CRUST-UI-TOOLBAR-CONTAINER-OFF" style="display:none"' + (CrustEnv.isIE6() ? ' class="CRUST-UI-GIF"' : '') + '><a onfocus="this.blur()" href="javascript:void(0)"></a></div>' + '<div id="CRUST-UI-TOOLBAR-CONTAINER-ON">' + '<div id="CRUST-UI-TOOLBAR-HIGHLIGHTER" class="' + (CrustEnv.isIE6() ? 'CRUST-UI-TOOLBAR-HIGHLIGHTER-GIF' : 'CRUST-UI-TOOLBAR-HIGHLIGHTER-PNG') + '"></div>' + '<div id="CRUST-UI-TOOLBAR-DRAGGER" class="' + (CrustEnv.isIE6() ? 'CRUST-UI-TOOLBAR-DRAGGER-GIF' : 'CRUST-UI-TOOLBAR-DRAGGER-PNG') + '"></div>' + '<div id="CRUST-UI-TOOLBAR-BODY">' + '<div id="CRUST-UI-TOOLBAR-BUTTONS">' + '<a id="CRUST-UI-TOOLBAR-BUTTON-NOTE" title="' + this.msg("ACTION_NEWNOTE") + '" onfocus="this.blur()" href="javascript:void(0)"></a>' + '<a id="CRUST-UI-TOOLBAR-BUTTON-OFF"></a>' + '<a id="CRUST-UI-TOOLBAR-BUTTON-LOGIN' + (this.authorized() ? "-LOGGED" : "") + '"></a>' + '<a id="CRUST-UI-TOOLBAR-BUTTON-VIEW" onfocus="this.blur()" href="javascript:void(0)"></a>' + '</div>' + '</div>' + '</div>';
        this.html.toolbar = h
    },
    preparePostWindow: function (n) {
        if (typeof n == "undefined")
            this.option("postWindowWidth");
        var h = "" + '<table id="CRUST-UI-NOTE-{ID}" cellspacing="0" cellpadding="0" class="CRUST-UI-NOTE" style="display:none;width:' + n + 'px"><tr><td>' + '<div id="CRUST-UI-POSTWINDOW-TOOLS-{ID}" class="CRUST-UI-POSTWINDOW-TOOLS" style="display:none">' + '<table cellspacing="0" celpadding="0">' + '<col/><col width="18"/>' + '<tr><td colspan="2"><a onfocus="this.blur()" title="' + this.msg("MENU_POSTWINDOW_CLOSE") + '" id="CRUST-UI-POSTWINDOW-TOOL-CLOSE-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-CLOSE" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_CLOSE") + '</a></td></tr>' + '<tr><td colspan="2"><a onfocus="this.blur()" title="' + this.msg("MENU_POSTWINDOW_CLOSE_EXCLUSIVE") + '" id="CRUST-UI-POSTWINDOW-TOOL-CLOSE-EXCLUSIVE-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-CLOSE-EXCLUSIVE" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_CLOSE_EXCLUSIVE") + '</a></td></tr>' + '<tr><td colspan="2"><a onfocus="this.blur()" title="' + this.msg("MENU_POSTWINDOW_NOSHARE") + '" id="CRUST-UI-POSTWINDOW-TOOL-NOSHARE-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-NOSHARE" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_NOSHARE") + '</a></td></tr>' + '<tr>' + '<td><a onfocus="this.blur()" id="CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_SHAREGROUP") + '</a></td>' + '<td width="18"><span id="CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-ARROW-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-SHAREGROUP-ARROW">▼</span>' + '</td></tr>' + '<tr><td colspan="2"><div id="CRUST-UI-POSTWINDOW-GROUPS-{ID}" class="CRUST-UI-POSTWINDOW-GROUPS" style="display:none"></div>' + '<tr><td colspan="2"><a onfocus="this.blur()" title="' + this.msg("MENU_POSTWINDOW_MAKEPUBLIC") + '" id="CRUST-UI-POSTWINDOW-TOOL-MAKEPUBLIC-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-MAKEPUBLIC" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_MAKEPUBLIC") + '</a></td></tr>' + '<tr><td colspan="2"><a onfocus="this.blur()" title="' + this.msg("MENU_POSTWINDOW_DELETE") + '" id="CRUST-UI-POSTWINDOW-TOOL-DELETE-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-DELETE" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_DELETE") + '</a></td></tr>' + '<tr><td colspan="2"><a onfocus="this.blur()" title="' + this.msg("MENU_POSTWINDOW_EXPORT") + '" id="CRUST-UI-POSTWINDOW-TOOL-EXPORT-{ID}" class="CRUST-UI-POSTWINDOW-TOOL-EXPORT" href="javascript:void(0)">' + this.msg("MENU_POSTWINDOW_EXPORT") + '</a></td></tr>' + '</table>' + '</div>' + '<div id="CRUST-UI-NOTE-HEADER-CONTAINER-{ID}" class="CRUST-UI-NOTE-HEADER-CONTAINER">' + '<table cellspacing="0" cellpadding="0" id="CRUST-UI-NOTE-HEADER-{ID}" class="CRUST-UI-NOTE-HEADER"><tr valign="top">' + '<td style="border-left:1px solid #fff !important;border-top:1px solid #fff !important">' + '<div id="CRUST-UI-NOTE-HEADER-LEFT-{ID}" class="CRUST-UI-NOTE-HEADER-LEFT">' + '<a onfocus="this.blur()" id="CRUST-UI-POSTWINDOW-TRIGGER-{ID}" class="CRUST-UI-POSTWINDOW-TRIGGER" href="javascript:void(0)" style="position:relative !important"></a>' + '</div>' + '<div id="CRUST-UI-NOTE-HEADER-CENTER-{ID}" class="CRUST-UI-NOTE-HEADER-CENTER">' + '<span id="CRUST-UI-POSTWINDOW-TITLE-{ID}" class="CRUST-UI-POSTWINDOW-TITLE"></span>' + '</div>' + '<div id="CRUST-UI-NOTE-HEADER-RIGHT-{ID}" class="CRUST-UI-NOTE-HEADER-RIGHT">' + '<a title="' + this.msg("MENU_POSTWINDOW_CLOSE") + '" onfocus="this.blur()" id="CRUST-UI-POSTWINDOW-CLOSE-{ID}" class="CRUST-UI-POSTWINDOW-CLOSE" href="javascript:void(0)"></a>' + '</div>' + '</td>' + '</tr></table>' + '</div>' + '<div id="CRUST-UI-NOTE-BODY-CONTAINER-{ID}" class="CRUST-UI-NOTE-BODY-CONTAINER">' + '<table cellspacing="0" cellpadding="0" id="CRUST-UI-NOTE-BODY-{ID}" class="CRUST-UI-NOTE-BODY"><tr>' + '<td style="border-left:1px solid #fff !important">' + '<ol id="CRUST-UI-NOTE-POSTS-{ID}" class="CRUST-UI-NOTE-POSTS"></ol>' + '<div id="CRUST-UI-NOTE-EDITOR-{ID}" class="CRUST-UI-NOTE-EDITOR" style="padding:10px 10px 0px 10px !important"><textarea class="CRUST-UI-POST-TEXTAREA" id="CRUST-UI-EDITOR-{ID}"></textarea></div>' + '</td>' + '</tr>' + '<tr valign="top" id="CRUST-UI-NOTE-TAG-CONTAINER-{ID}"><td class="CRUST-UI-NOTE-TAG-CONTAINER" style="border-left:1px solid #fff !important">' + '<div class="CRUST-UI-NOTE-TAG" id="CRUST-UI-NOTE-TAG-{ID}" style="width:100% !important"></div>' + '</td></tr>' + '</table>' + '</div>' + '<table cellspacing="0" cellpadding="0" id="CRUST-UI-NOTE-FOOTER-{ID}" class="CRUST-UI-NOTE-FOOTER"><tr><td style="border-left:1px solid #fff !important">' + '<div id="CRUST-UI-NOTE-FLEXBAR-{ID}" class="CRUST-UI-NOTE-FLEXBAR"><spacer width="1" height="1"/></div>' + '</td></tr></table>' + '<div id="CRUST-UI-NOTE-GRIPPER-BACK-{ID}" class="CRUST-UI-NOTE-GRIPPER-BACK"></div>' + '<div id="CRUST-UI-NOTE-GRIPPER-{ID}" class="CRUST-UI-NOTE-GRIPPER"></div>' + '</div>' + '</div>' + '</td></tr></table>';
        this.html.note = h;
        return h
    },
    prepareShadow: function (n) {
        var h = "" + '<table class="CRUST-UI-NOTE-SHADOW" id="CRUST-UI-NOTE-SHADOW-{ID}" border="0" cellpadding="0" cellspacing="0" style="table-layout:fixed">' + '<tr valign="top" class="CRUST-UI-NOTE-SHADOW-TOP">' + '<td class="CRUST-UI-NOTE-SHADOW-TOP-LEFT"></td>' + '<td class="CRUST-UI-NOTE-SHADOW-TOP-RIGHT"></td>' + '</tr>' + '<tr valign="top" id="CRUST-UI-NOTE-SHADOW-BODY-{ID}" class="CRUST-UI-NOTE-SHADOW-BODY CRUST-UI-PNGFIX">' + '<td class="CRUST-UI-NOTE-SHADOW-BODY-LEFT"></td>' + '<td class="CRUST-UI-NOTE-SHADOW-BODY-RIGHT"></td>' + '</tr>' + '<tr valign="top" class="CRUST-UI-NOTE-SHADOW-BOTTOM">' + '<td class="CRUST-UI-NOTE-SHADOW-BOTTOM-LEFT"></td>' + '<td id="CRUST-UI-NOTE-SHADOW-BOTTOM-RIGHT-{ID}" class="CRUST-UI-NOTE-SHADOW-BOTTOM-RIGHT"></td>' + '</tr>' + '</table>';
        this.html.shadow = h;
        return h
    },
    prepareTaker: function () {
        this.html.taker = '<div style="z-index:' + CrustDepth.getUI() + '" id="CRUST-UI-HIGHLIGHT-TAKER"></div>'
    },
    prepareLine: function () {
        var h = '<canvas style="position:absolute" id="CRUST-UI-LINE"></canvas>';
        this.html.line = h
    },
    prepareNeedLogin: function () {
        var h = "" + '<div id="CRUST-UI-NEEDLOGIN-WRAPPER">' + '<div id="CRUST-UI-NEEDLOGIN" class="' + (CrustEnv.isIE6() ? 'CRUST-UI-NEEDLOGIN-GIF' : 'CRUST-UI-NEEDLOGIN-PNG') + '"></div>' + '<div id="CRUST-UI-NEEDLOGIN-INNER">' + '<form target="_top" method="post" action="' + LemonPen.URL_LOGIN + '">' + '<div>' + '<input name="openid_url" id="CRUST-UI-NEEDLOGIN-INPUT"/>' + '<input type="hidden" id="remember_me" name="remember_me" value="y"/>' + '<input type="hidden" name="referer_url" value="' + (top.document.location.toString()) + '"/>' + '<input type="submit" id="CRUST-UI-NEEDLOGIN-LOGIN" value="' + this.msg("LOGIN") + '"/>' + '<a href="javascript:void(0)" id="CRUST-UI-NEEDLOGIN-CANCEL"></a>' + '</div>' + '</form>' + '</div>' + '</div>';
        this.html.needLogin = h
    },
    prepareSetting: function () {}
});
var CrustUser = CrustClass.create();
CrustClass.extend(CrustUser, {
    userid: null,
    username: null,
    openid: null,
    is_openid: false,
    localid: null,
    groups: [],
    logged: function () {
        return !isNaN(CrustUser.userid) && CrustUser.userid > 0
    }
});
function $CRUST(a) {
    return document.getElementById(a)
}
var CrustPosition = CrustClass.create();
CrustPosition = {
    cumulative: function (e) {
        var valueT = 0,
        valueL = 0;
        do {
            valueT += e.offsetTop || 0;
            valueL += e.offsetLeft || 0;
            e = e.offsetParent
        } while (e);
        return [valueL, valueT]
    },
    absolute: function (e) {
        var t = 0,
        l = 0;
        do {
            t += e.offsetTop || 0;
            l += e.offsetLeft || 0;
            e = e.offsetParent;
            if (e) {
                if (e.tagName == 'BODY')
                    break;
                var p = CrustElement.getStyle(e, 'position');
                if (p == 'relative' || p == 'absolute')
                    break
            }
        } while (e);
        return [l, t]
    }
};
var CrustElement = CrustClass.create();
CrustElement = {
    toHtml: function (e) {
        var t = document.createElement("div");
        t.appendChild(e.cloneNode(true));
        return t.innerHTML
    },
    toText: function (e) {
        if (e.nodeType == 1)
            return e.textContent || e.innerText;
        else if (e.nodeType == 3)
            return e.nodeValue
    },
    addClass: function (e, c) {
        var a = e.className.split(" ");
        for (var i = 0; i < a.length; i++)
            if (a[i] == c)
                return;
        a.push(c);
        e.className = a.join(" ")
    },
    removeClass: function (e, c) {
        var a = e.className.split(" ");
        for (var i = 0; i < a.length; i++) {
            if (a[i] == c) {
                a.splice(i, 1);
                break
            }
        }
        e.className = a.join(" ")
    },
    getDimension: function (e) {
        var display = CrustElement.getStyle(e, 'display');
        if (display != 'none' && display != null)
            return {
                width: e.offsetWidth,
                height: e.offsetHeight
            };
        var s = e.style;
        var v = s.visibility;
        var p = s.position;
        var d = s.display;
        s.visibility = 'hidden';
        s.position = 'absolute';
        s.display = 'block';
        var w = e.clientWidth;
        var h = e.clientHeight;
        s.display = d;
        s.position = p;
        s.visibility = v;
        return {
            width: w,
            height: h
        }
    },
    getStyle: function (el, prop) {
        prop = (prop == "float") ? "cssFloat" : CrustUtil.camelize(prop);
        var v = el.style[prop];
        if (!v && el.currentStyle)
            v = el.currentStyle[prop];
        if (!v) {
            if (document.defaultView.getComputedStyle) {
                if (prop == "backgroundPosition") {
                    var st = document.defaultView.getComputedStyle(el, null);
                    var v = st.getPropertyValue("background-position");
                    return v
                }
                var css = document.defaultView.getComputedStyle(el, null);
                v = css ? css[prop] : null
            } else {}
        }
        return v
    },
    height: function (e) {
        return this.getDimension(e).height
    },
    width: function (e) {
        return this.getDimension(e).width
    },
    _getElementsByXPath: function (expression, parentElement) {
        var results = [];
        if (document.evaluate) {
            var query = document.evaluate(expression, parentElement || document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
            for (var i = 0, length = query.snapshotLength; i < length; i++)
                results.push(query.snapshotItem(i))
        } else {
            var elems = document.body.getElementsByTagName("*");
            for (var i = 0; i < elems.length; i++)
                results.push(elems[i])
        }
        return results
    },
    getElementsByClassName: function (tag, c, p) {
        if (document.evaluate)
            return CrustElement._getElementsByXPath(".//" + tag + "[contains(concat(' ', @class, ' '), ' " + c + " ')]", p);
        else {
            var r = [];
            var a = (p || document.body).getElementsByTagName(tag);
            var l;
            var t = new RegExp("(^|\\s)" + c + "(\\s|$)");
            for (var i = 0; i < a.length; i++) {
                l = a[i].className;
                if (l.length == 0)
                    continue;
                if (l == c || l.match(t))
                    r.push(a[i])
            }
            return r
        }
    },
    getPath: function (e) {
        try {
            var p = [];
            while (true) {
                if (e.nodeType == 1)
                    p.unshift(e.nodeName.toLowerCase());
                if (!(e = e.parentNode) || e.nodeName.toLowerCase() == "body")
                    break
            }
            return p.join("/")
        } catch (err) {}
    },
    getClosestContainer: function (e) {
        while (true) {
            if (e.nodeType == "#document")
                return "";
            if (e.nodeType == 1) {
                var c = e.className;
                var d = e.id;
                if (d)
                    return "#" + d;
                if (c)
                    return "." + c
            }
            if (e.parentNode)
                e = e.parentNode;
            else
                return ""
        }
    },
    inClassOrID: function (e, s) {
        try {
            var t = s.substr(1);
            while (true) {
                if (e.nodeType == "#document")
                    return false;
                var d = e.id;
                var c = e.className;
                if (s.substr(0, 1) == "." && c && c == t)
                    return true;
                else if (s.substr(0, 1) == "#" && d && d == t)
                    return true;
                if (!e.parentNode)
                    return false;
                e = e.parentNode
            }
        } catch (err) {
            return false
        }
    }
};
var CrustKey = {
    ESCAPE: 27,
    ENTER: 13,
    TAB: 9
};
var CrustEvent = CrustClass.create();
CrustEvent = {
    listeners: [],
    element: function (e) {
        return e.target || e.srcElement
    },
    listenEvent: function (trg, evt, obj, func) {
        obj = obj || window;
        var f = function (e) {
            if (typeof obj[func] == "function")
                obj[func](e)
        };
        this.listeners.push({
            obj: obj,
            func: func,
            f: f
        });
        if (trg.addEventListener) {
            trg.addEventListener(evt, f, true)
        } else if (trg.attachEvent) {
            trg.attachEvent("on" + evt, f)
        }
    },
    stopListen: function (trg, evt, obj, func) {
        var f;
        for (var i = 0; i < this.listeners.length; i++) {
            if (this.listeners[i].obj == obj && this.listeners[i].func == func) {
                f = this.listeners[i].f;
                this.listeners.splice(i, 1)
            }
        }
        if (!f)
            return;
        obj = obj || window;
        if (trg.addEventListener) {
            trg.removeEventListener(evt, f, true)
        } else if (trg.attachEvent) {
            trg.detachEvent("on" + evt, f)
        }
    },
    mouseX: function (e) {
        return e.pageX || (e.clientX + (document.documentElement.scrollLeft || document.body.scrollLeft))
    },
    mouseY: function (e) {
        return e.pageY || (e.clientY + (document.documentElement.scrollTop || document.body.scrollTop))
    },
    stop: function (e) {
        e = e || event;
        if (e.preventDefault) {
            e.preventDefault();
            e.stopPropagation()
        } else {
            e.returnValue = false;
            e.cancelBubble = true
        }
    }
};
var CrustUtil = {
    _chars: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
    _randomIDs: [],
    escapeHtml: function (s) {
        return s.replace(/</g, "&lt;").replace(/>/g, "&gt;")
    },
    unescapeHtml: function (s) {
        return s.replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    },
    ltrim: function (s) {
        return s.replace(/^\s+/, "")
    },
    rtrim: function (s) {
        return s.replace(/\s+$/, "")
    },
    trim: function (s) {
        return CrustUtil.rtrim(CrustUtil.ltrim(s))
    },
    isXHTML: function (doc) {
        doc = doc || document;
        if (CrustEnv.isIE()) {
            return false
        } else {
            if (doc.doctype && doc.doctype.publicId) {
                var m = new RegExp("DTD XHTML (.+?)\/", "mg").exec(doc.doctype.publicId.toString());
                if (m)
                    return true
            }
        }
        return false
    },
    getClientRect: function (d) {
        d = d || document;
        var w1 = d.documentElement.clientWidth;
        var h1 = d.documentElement.clientHeight;
        var w2 = d.body.clientWidth;
        var h2 = d.body.clientHeight;
        if (CrustUtil.isXHTML()) {
            if (CrustEnv.isOpera())
                return [w1, h2];
            return [w1 == 0 ? w2 : w1, h1 == 0 ? h2 : h1]
        }
        var result = [w1 == 0 ? w2 : Math.min(w1, w2), h1 == 0 ? h2 : Math.min(h1, h2)];
        return result
    },
    getClientScroll: function (d) {
        d = d || document;
        var x1 = d.documentElement.scrollLeft;
        var y1 = d.documentElement.scrollTop;
        var x2 = d.body.scrollLeft;
        var y2 = d.body.scrollTop;
        if (this.isXHTML(d))
            return [x1, y1];
        return [Math.max(x1, x2), Math.max(y1, y2)]
    },
    inArray: function (arr, trg) {
        for (var i = 0; i < arr.length; i++)
            if (arr[i] == trg)
                return true;
        return false
    },
    camelize: function (s) {
        var parts = s.split('-'),
        len = parts.length;
        if (len == 1)
            return parts[0];
        var camelized = s.charAt(0) == '-' ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1) : parts[0];
        for (var i = 1; i < len; i++)
            camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);
        return camelized
    },
    getRandom: function (len, prefix) {
        len = len || 15;
        var random_id = "";
        while (true) {
            for (var i = 0; i < len; i++)
                random_id += CrustUtil._chars[Math.floor(Math.random() * CrustUtil._chars.length)];
            if (!CrustUtil.inArray(CrustUtil._randomIDs, random_id))
                break
        }
        CrustUtil._randomIDs.push(random_id);
        return (prefix || "") + random_id
    },
    stripTags: function (s) {
        return s.replace(/<\/?[^>]+>/gi, "")
    },
    cleanHtml: function (s) {
        if (!s || s.length == 0)
            return s;
        s = s.replace(/&nbsp;/gi, " ");
        s = s.replace(/\s+/g, " ");
        return s
    },
    squeeze: function (s) {
        return this.cleanHtml(s).replace(/ /g, "")
    },
    jsonize: function (arg) {
        switch (typeof arg) {
        case 'function':
            break;
        case 'object':
            if (arg) {
                if (arg.constructor == Array) {
                    var o = '';
                    for (var i = 0; i < arg.length; ++i) {
                        var v = CrustUtil.jsonize(arg[i]);
                        if (o) {
                            o += ','
                        }
                        if (v != null) {
                            o += v
                        } else {
                            o += 'null,'
                        }
                    }
                    return '[' + o + ']'
                } else if (typeof arg.toString != 'undefined') {
                    var o = '';
                    for (var i in arg) {
                        var v = CrustUtil.jsonize(arg[i]);
                        if (v != null) {
                            if (o) {
                                o += ','
                            }
                            o += CrustUtil.jsonize(i) + ':' + v
                        }
                    }
                    return '{' + o + '}'
                } else {
                    return
                }
            }
            return 'null';
        case 'unknown':
        case 'undefined':
            return arg.name;
        case 'string':
            return '"' + arg.replace(/(["\\])/g, '\\$1') + '"';
        default:
            return String(arg)
        }
    }
};
var CrustFlash = {
    initialize: function () {},
    embed: function (obj, flash_id) {
        oTarget = document.getElementById(flash_id);
        var opts = ['id', 'width', 'height', 'movie', 'flashvars', 'style'];
        var fObj = {};
        for (var i = 0; i < opts.length; i++) {
            var opt = opts[i];
            fObj[opt] = obj[opt] || ''
        }
        var _w = parseInt(fObj.width.toString().replace(/(px|em)/i, ''));
        var _h = parseInt(fObj.height.toString().replace(/(px|em)/i, ''));
        var arr = [];
        if (CrustEnv.isIE()) {
            arr.push('<object id="' + fObj.id + '" classid="clsid:D27CDB6E-AE6D-11CF-96B8-444553540000" width="' + fObj.width + '" height="' + fObj.height + '" style="' + fObj.style + '">');
            arr.push('<param name="movie" value="' + fObj.movie + '"/>');
            arr.push('<param name="menu" value="false"/>');
            arr.push('<param name="quality" value="high"/>');
            arr.push('<param name="allowScriptAccess" value="always"/>');
            arr.push('<param name="play" value="true"/>');
            arr.push('<param name="SeamlessTabbing" value="false"/>');
            arr.push('<param name="wmode" value="transparent"/>');
            arr.push('<param name="scale" value="noscale"/>');
            arr.push('<param name="flashvars" value="' + fObj.flashvars + '"/>');
            arr.push('<param name="allowNetworking" value="all"/>');
            arr.push('</object>')
        } else {
            arr.push('<embed style="' + fObj.style + '" allownetworking="all" play="true" scale="noscale" wmode="transparent" flashvars="' + fObj.flashvars + '" src="' + fObj.movie + '" quality="high" bgcolor="" width="' + _w + '" height="' + _h + '" name="' + fObj.id + '" align="middle" allowscriptaccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>')
        }
        if (oTarget)
            oTarget.innerHTML = arr.join("");
        else
            document.write(arr.join(""))
    }
};
function print_r(o, b) {
    if (typeof b == "undefined")
        b = false;
    var d = [];
    for (var p in o) {
        if (typeof o[p] == "function")
            continue;
        d.push(p + " =>" + o[p])
    }
    if (b)
        return d.join("\n");
    else
        alert(d.join("\n"))
};
var CrustEnv = CrustClass.create();
CrustClass.extend(CrustEnv, {
    browser: "",
    browserVersion: 0,
    os: "",
    osVersion: 0,
    initialize: function () {
        var b = "unknown";
        if (navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') == -1)
            b = "gecko";
        else if (!!(window.attachEvent && !window.opera))
            b = "ie";
        else if (!!window.opera)
            b = "opera";
        this.browser = b
    },
    isGecko: function () {
        return this.browser == "gecko"
    },
    isIE: function () {
        return this.browser == "ie"
    },
    isOpera: function () {
        return this.browser == "opera"
    },
    isIE6: function () {
        return this.browser == "ie" && new RegExp("MSIE 6\\.").test(navigator.userAgent)
    }
});
var CrustRange = CrustClass.create();
CrustRange.MIN_DISTANCE = 50;
CrustClass.extend(CrustRange, CrustBase.prototype);
CrustClass.extend(CrustRange, {
    initialize: function () {},
    getSelection: function (b) {
        if (window.getSelection)
            return window.getSelection();
        else if (document.selection)
            return document.selection
    },
    getRange: function () {
        var r = null;
        var s = this.getSelection();
        if (s) {
            if (s.getRangeAt && s.rangeCount > 0)
                return s.getRangeAt(0);
            else if (s.createRange)
                return s.createRange()
        }
        return r
    },
    getText: function () {
        var r = this.getRange();
        if (r) {
            if (r.text)
                return r.text;
            else if (r.toString)
                return r.toString()
        }
        return ""
    },
    hasText: function () {
        return this.getText().length > 0
    },
    clear: function () {
        try {
            window.getSelection().removeAllRanges()
        } catch (e) {
            document.selection.empty()
        }
    },
    toHtml: function (r) {
        var h = "";
        if (r.cloneContents) {
            var p = document.createElement("div");
            var c = r.commonAncestorContainer;
            var t = document.createElement(c.nodeType == 1 ? c.nodeName : "div");
            t.appendChild(r.cloneContents());
            p.appendChild(t);
            h = p.innerHTML
        } else if (r.htmlText) {
            var regex = /<(\/?[A-Z1-6]+)((?:\s+[^>]+)*)>([^<]*)/gi;
            var regex2 = /<(img|(?:b|h)r)(.*?)(?!\/>)>/gi;
            var regex3 = /<(.+?)(style=".+?")(.*?)>/gi;
            var t = document.createElement(r.parentElement().nodeName);
            t.innerHTML = r.htmlText;
            h = t.outerHTML;
            h = h.replace(regex, this._toLowerCaseTag);
            h = h.replace(regex2, this._addClosingTag);
            h = h.replace(regex3, this._toLowerCaseStyle)
        }
        return h
    },
    _addClosingTag: function ($0, $1, $2) {
        return '<' + $1 + $2 + '/>'
    },
    _toLowerCaseTag: function ($0, $1, $2, $3) {
        var regex = /=([^"]+?)(\s+|$)/gi;
        return '<' + $1.toLowerCase() + $2.replace(regex, '="$1"$2') + '>' + $3
    },
    _toLowerCaseStyle: function ($0, $1, $2, $3) {
        return '<' + $1 + $2.toLowerCase() + $3 + '>'
    },
    getPosition: function (r, bStart) {
        if (typeof bStart == "undefined")
            bStart = true;
        try {
            if (r.insertNode) {
                var r1 = r.cloneRange();
                var s = r1.startContainer;
                var e = r1.endContainer;
                var sf = r1.startOffset;
                var ef = r1.endOffset;
                var t = document.createElement("span");
                t.style.cssText = "display:inline !important;float:none !important;position:static !important;padding:0 !important;margin:0 !important";
                t.innerHTML = "!";
                if (bStart) {
                    r1.collapse(true);
                    r1.insertNode(t)
                } else {
                    var r2 = document.createRange();
                    r2.setStart(r1.endContainer, r1.endOffset);
                    r2.setEnd(r1.endContainer, r1.endOffset);
                    r2.insertNode(t);
                    r2.detach()
                }
                var p1 = CrustPosition.cumulative(t);
                t.parentNode.removeChild(t);
                var a = {
                    left: p1[0],
                    top: p1[1]
                };
                return a
            } else if (r.getBoundingClientRect) {
                var c = r.getClientRects();
                return {
                    left: bStart ? c[0].left : c[c.length - 1].right,
                    top: bStart ? c[0].top : c[c.length - 1].top
                }
            }
            return [0, 0]
        } catch (er) {
            this.log(er)
        }
    },
    getPosition2: function (r) {
        try {
            if (r.insertNode) {
                var r1 = r.cloneRange();
                var sel = window.getSelection();
                var t = document.createElement("span");
                t.style.cssText = "display:inline !important;float:none !important;position:static !important;padding:0 !important;margin:0 !important";
                t.innerHTML = "!";
                sel.addRange(r1);
                sel.anchorNode.parentNode.insertBefore(t, sel.anchorNode);
                var p1 = CrustPosition.cumulative(t);
                t.parentNode.removeChild(t);
                var a = {
                    left: p1[0],
                    top: p1[1]
                };
                return a
            }
        } catch (er) {
            this.log(er)
        }
    },
    startElement: function (r) {
        if (r.startContainer)
            return r.startContainer;
        else if (r.parentElement) {
            var p = r.parentElement();
            var nodes = p.childNodes;
            var clone = r.duplicate();
            clone.collapse(true);
            clone.pasteHTML('<span id="___tmp___"></span>');
            var tmp = document.getElementById("___tmp___");
            var elem = tmp.nextSibling;
            tmp.parentNode.removeChild(tmp);
            return elem
        }
    },
    endElement: function (r) {
        if (r.endContainer)
            return r.endContainer;
        else if (r.parentElement) {
            var p = r.parentElement();
            var nodes = p.childNodes;
            var clone = r.duplicate();
            clone.collapse(false);
            clone.pasteHTML('<span id="___tmp___"></span>');
            var tmp = document.getElementById("___tmp___");
            var elem = tmp.previousSibling;
            tmp.parentNode.removeChild(tmp);
            return elem
        }
    },
    textize: function (rng) {
        var p = document.createElement("root");
        if (rng.cloneContents) {
            var frag = rng.cloneContents();
            p.appendChild(frag)
        } else if (rng.htmlText) {
            p.innerHTML = rng.htmlText
        }
        var blockedTags = ['script', "img"];
        for (var i = 0; i < blockedTags.length; i++) {
            var els = p.getElementsByTagName(blockedTags[i]);
            for (var j = 0; j < els.length; j++)
                els[j].parentNode.removeChild(els[j])
        }
        return this._textize(p)
    },
    _textize: function (elem) {
        var html = '';
        var tags = ["img"];
        if (elem.hasChildNodes()) {
            var e,
            d;
            for (var i = 0; i < elem.childNodes.length; i++) {
                e = elem.childNodes[i];
                if (e.nodeType == 1 && CrustElement.getStyle(e, "display") == "none")
                    html = "\n" + html + "\n";
                else
                    html += this._textize(e);
                if (e.nodeType == 1 && (CrustUtil.inArray(tags, e.nodeName.toLowerCase()) || CrustElement.getStyle(e, "display") != "inline")) {
                    html = "\n" + html + "\n"
                }
            }
        } else {
            if (elem.nodeType == 3) {
                html = "\n" + (elem.textContent || elem.nodeValue).replace(/\r?\n/g, "\n") + "\n"
            }
        }
        return html
    },
    getStartElement: function (r) {
        return this.startElement(r);
        var s = this.startElement(r);
        if (CrustUtil.squeeze((s.textContent || s.nodeValue)).length == 0) {
            if (s.parentNode.nextSibling) {
                if (r.setStartBefore)
                    r.setStartBefore(s.parentNode.nextSibling)
            }
        }
        s = this.startElement(r);
        return s
    },
    getEndElement: function (r) {
        return this.endElement(r)
    },
    serialize: function () {
        var d,
        r = this.getRange();
        if (r) {
            var html = this.textize(r);
            var source = this.toHtml(r);
            var pos = this.getPosition(r);
            var posend = this.getPosition(r, false);
            var segs = html.split(/\r?\n/g),
            seg = "";
            var a = [];
            for (var i = 0; i < segs.length; i++) {
                seg = CrustUtil.trim(segs[i]);
                if (CrustUtil.squeeze(seg).length > 0)
                    a.push(seg)
            }
            var start_element = this.getStartElement(r);
            var end_element = this.getEndElement(r);
            var s = a.join("\n");
            var ex = "";
            var path = CrustElement.getPath(start_element);
            var endpath = CrustElement.getPath(end_element);
            var within = CrustElement.getClosestContainer(start_element);
            var endwithin = CrustElement.getClosestContainer(end_element);
            d = {
                text: s,
                source: source,
                json: CrustUtil.jsonize({
                    extended: ex,
                    path: path,
                    endpath: endpath,
                    within: within,
                    endwithin: endwithin,
                    pos: pos,
                    posend: posend
                })
            }
        }
        return d
    },
    match: function (r, text, info, bStart) {
        var e,
        cPath,
        cWithin,
        path,
        bPath,
        bIn;
        if (bStart) {
            e = this.startElement(r);
            cPath = info.path;
            cWithin = info.within
        } else {
            e = this.endElement(r);
            cPath = info.endpath;
            cWithin = info.endwithin
        }
        var path = CrustElement.getPath(e);
        var bPath = path == cPath;
        var bIn = CrustElement.inClassOrID(e, cWithin);
        var paths = path.split("/");
        paths.pop();
        var bPath2 = paths.join("/") == cPath;
        if (cWithin && !bIn)
            return false;
        if (cPath && (!bPath && !bPath2))
            return false;
        return true
    },
    getDistance: function (r, pos) {
        var p = this.getPosition(r);
        return Math.sqrt(Math.pow(Math.abs(pos.left - p.left), 2) + Math.pow(Math.abs(pos.top - p.top), 2))
    },
    getDistance2: function (r, pos) {
        var p = this.getPosition2(r);
        return Math.sqrt(Math.pow(Math.abs(pos.left - p.left), 2) + Math.pow(Math.abs(pos.top - p.top), 2))
    },
    find: function (d, p) {
        try {
            if (!d.text || d.text == "")
                return;
            eval("var a = " + d.info);
            var _this = this;
            var e = a.extended,
            r = [],
            p = a.path,
            q;
            var t = d.text.split("\n");
            var b = false;
            var f = typeof window.find == "function";
            var cands = [];
            var txt = "";
            try {
                var __b = window.find("--NON-EXISTENCES--");
                f = typeof __b == "boolean"
            } catch (err) {
                f = false
            }
            if (f) {
                txt = CrustUtil.unescapeHtml(t[0]);
                while (true) {
                    b = window.find(txt, false, false, false, true, false, false);
                    if (!b)
                        break;
                    var _r = this.getRange();
                    var bMatch = this.match(_r, txt, a, true);
                    if (bMatch)
                        r.push(_r.cloneRange())
                }
                var start;
                if (r.length == 1)
                    start = r[0];
                else {
                    var start_max = Number.POSITIVE_INFINITY,
                    tmpr;
                    for (var i = 0; i < r.length; i++) {
                        var diff = this.getDistance2(r[i], a.pos);
                        if (diff < start_max) {
                            start_max = diff;
                            start = r[i]
                        }
                    }
                }
                if (!start)
                    return [];
                var r_prev = start.cloneRange(),
                tmpr;
                if (start) {
                    var r = [start];
                    this.clear();
                    for (var i = 1; i < t.length; i++) {
                        txt = CrustUtil.unescapeHtml(t[i]);
                        txt = CrustUtil.ltrim(txt);
                        if (CrustUtil.squeeze(t[i]).length == 0)
                            continue;
                        while (true) {
                            b = window.find(txt, false, false, false, true, false, false);
                            if (b) {
                                tmpr = this.getRange();
                                var cpr = tmpr.compareBoundaryPoints(Range.START_TO_START, r_prev);
                                if (cpr == 1) {
                                    r.push(tmpr);
                                    r_prev = tmpr;
                                    break
                                } else {}
                            } else
                                break
                        }
                    }
                    this.clear();
                    return r
                }
                return []
            } else if (document.body.createTextRange) {
                var tr,
                p = document.body;
                txt = CrustUtil.unescapeHtml(t[0]);
                tr = p.createTextRange();
                for (; tr.findText(txt) != false; ) {
                    if (this.match(tr, txt, a, true))
                        r.push(tr.duplicate());
                    tr.collapse(false)
                }
                this.clear();
                var start;
                if (r.length == 1)
                    start = r[0];
                else {
                    var start_max = Number.POSITIVE_INFINITY,
                    tmpr;
                    for (var i = 0; i < r.length; i++) {
                        var diff = this.getDistance(r[i], a.pos);
                        if (diff < start_max) {
                            start_max = diff;
                            start = r[i]
                        }
                    }
                }
                var dummy = start;
                if (!start)
                    return [];
                var r_prev = start;
                if (start) {
                    var r = [start];
                    this.clear();
                    var a = p.createTextRange();
                    for (var i = 1; i < t.length; i++) {
                        txt = CrustUtil.unescapeHtml(t[i]);
                        txt = CrustUtil.ltrim(txt);
                        if (CrustUtil.squeeze(t[i]).length == 0)
                            continue;
                        for (; a.findText(txt) != false; ) {
                            var cpr = a.compareEndPoints("EndToEnd", r_prev);
                            if (cpr == 1) {
                                r.push(a.duplicate());
                                r_prev = a.duplicate();
                                break
                            }
                            a.collapse(false)
                        }
                    }
                    this.clear();
                    return r
                }
                return []
            } else {
                var r = [];
                var x = "//undefined.undefined.undefined/undefined/undefined/undefined://span//" + a.path;
                var elems = CrustElement._getElementsByXPath(x);
                var cands = [];
                for (var i = 0; i < elems.length; i++) {
                    var s = CrustElement.toText(elems[i]);
                    if (!s || s.indexOf(t[0]) == -1) {
                        elems.splice(i--, 1)
                    }
                }
                var cur;
                for (var i = 0; i < elems.length; i++) {
                    cur = this._find(elems[i], t[0]);
                    if (this.match(cur, t[0], a)) {
                        r.push(cur)
                    }
                }
                if (r.length == 1)
                    cur = r[0];
                else {
                    var cur_max = Number.POSITIVE_INFINITY,
                    tmpr;
                    for (var i = 0; i < r.length; i++) {
                        var diff = this.getDistance(r[i], a.pos);
                        if (diff < cur_max) {
                            cur_max = diff;
                            cur = r[i]
                        }
                    }
                }
                if (cur) {
                    var r = [cur];
                    this.clear();
                    for (var i = 1; i < t.length; i++) {
                        txt = CrustUtil.unescapeHtml(t[i]);
                        if (CrustUtil.squeeze(t[i]).length == 0)
                            continue;
                        var rng = this._findByText(t[i], null);
                        if (rng) {
                            r.push(rng);
                            continue
                        }
                    }
                    this.clear();
                    return r
                }
                return [cur]
            }
            CrustRange.clear();
            return r
        } catch (err) {
            this.log(err)
        }
    },
    _findByText: function (txt, rng) {
        var elems = document.body.getElementsByTagName("*");
        var result = [];
        var rng = null;
        for (var i = 0; i < elems.length; i++) {
            elems[i].normalize();
            if (CrustElement.toText(elems[i]).indexOf(txt) > -1) {
                result.push(elems[i])
            }
        }
        for (var i = 0; i < result.length; i++) {
            rng = this._find(result[i], txt)
        }
        return rng
    },
    _find: function (elem, txt) {
        try {
            var rng = document.createRange();
            rng.selectNodeContents(elem);
            var s,
            e,
            e_prev,
            len = elem.childNodes.length;
            for (var i = 0; i < len; i++) {
                s = elem.childNodes[i];
                rng.setStart(s, 0);
                if (rng.toString().indexOf(txt) == -1) {
                    s = elem.childNodes[Math.max(0, i - 1)];
                    rng.setStart(s, 0);
                    break
                }
            }
            for (var j = Math.max(i - 1, 0); j < len; j++) {
                e = elem.childNodes[j];
                rng.setEndAfter(e);
                if (rng.toString().indexOf(txt) > -1)
                    break
            }
            var s_c = (s.innerHTML || s.textContent),
            e_c = (e.innerHTML || e.textContent);
            for (var i = 0, len = s_c.length; i < len; i++) {
                rng.setStart(s, i);
                if (rng.toString().indexOf(txt) == -1) {
                    rng.setStart(s, Math.max(0, i - 1));
                    for (var j = (s == e ? i : 0); j < e_c.length; j++) {
                        rng.setEnd(e, j);
                        if (rng.toString().indexOf(txt) > -1)
                            break
                    }
                    break
                }
            }
            return rng
        } catch (er) {
            this.log(er)
        }
    },
    containsText: function (s, t) {
        return s.indexOf(t) > -1
    },
    hasCrust: function () {
        try {
            var r = this.getRange();
            if (!r)
                return false;
            if (r.cloneContents) {
                var q,
                f = r.cloneContents();
                var t = document.createElement("span");
                t.appendChild(f);
                if (t.innerHTML.indexOf("CRUST-UI-") > -1)
                    return true;
                return false
            } else if (r.htmlText)
                return r.htmlText.indexOf("CRUST-UI-") > -1
        } catch (e) {
            this.log(e)
        }
    }
});
if (document && document.body) {
    var lemonpen; {
        if (lemonpen && lemonpen.VERSION) {
            delete lemonpen
        }
        lemonpen = new LemonPen(document);
        lemonpen.activate()
    }
}
