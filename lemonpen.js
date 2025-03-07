/**********************************************************
LemonPen JS by openid[disappered] to IREN.

Archived by web.archive.org
**********************************************************/

var LemonpenLoader = function(){};
LemonpenLoader = {
	interval:10,
	timer:null,
	initialized:false,
	urlScript:"lemonpen_script.js",
	listen:function(trg,evt,obj,func)
	{
		obj = obj || window;
		var f = function(e)
		{
			if (typeof obj[func] == "function")
				obj[func](e);
		};
		if (trg.addEventListener)
			trg.addEventListener(evt,f,true);
		else if (trg.attachEvent)
			trg.attachEvent("on" + evt,f);
	},
	initialize:function()
	{
		this.initialized = true;
		if (navigator.userAgent.indexOf('Gecko') > -1 || navigator.userAgent.indexOf('MSIE') > -1)
		{
			this.check();
		}
	},
	check:function()
	{
		var t = this;
		if (this.timer)
			window.clearTimeout(this.timer);
		if (document.body)
		{
			window.clearTimeout(this.timer);
			this.listen(window,"load",this,"onload");
		}
		else
		{
			this.timer = window.setTimeout(function()
			{
				t.check();
			},100);
		}
	},
	onload:function()
	{
		window.setTimeout(this.loadScript,this.interval);
	},
	loadScript:function()
	{
		if (this.timer)
			window.clearTimeout(this.timer);
		try
		{
			var s = document.createElement('script');
			s.setAttribute("type","text/javascript");
			s.setAttribute("src",LemonpenLoader.urlScript);
			s.setAttribute("charset","utf-8");

			document.body.appendChild(s);
		}
		catch(e){}
	}
};

LemonpenLoader.initialize();
