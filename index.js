	(function(global) {
		// 工具类
		var tool = {
			getelement : function(el){
				return document.getElementById(el);
			}
		}
		
		// 属于地雷的功能类
		var boomClass= {
			boomCompute : function(count,el) {
				var d = count,
					x,
					y,	
					t = [
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0],
						[0,0,0,0]
					];

				while (d != 0){
						x = Math.ceil(Math.random()*5)-1;
						y = Math.ceil(Math.random()*4)-1;
						
						if (t[x][y] === "l") {
							continue
							// --i  // 发现就递减 计数i 也会引发性能问题原因是x y的取值设置有问题 索引为0的永远取不到 只能设置最多12颗雷 再多就设置不了了 
						} else {
							t[x][y] = "l";
							--d;
						}
				}

				(function ji(){
					for (let i = 0; i < 5; i++) {
						for (let y = 0; y < 4; y++) {
							if (t[i][y] === "l") {
								continue
							} else {
								t[i][y] = re(i, y);
							}
						}
					}

					function re(i, y){

						var c=0;

						if (i > 0 && y > 0 && t[i-1][y-1] === "l") {c++}

						if (i > 0 && t[i-1][y] === "l") {c++}

						if (i > 0 && y < 3 && t[i-1][y+1] === "l") {c++}

						if (y > 0 && t[i][y-1] === "l") {c++}

						if (y < 3 && t[i][y+1] === "l") {c++}

						if (i < 4 && y > 0 && t[i+1][y-1] === "l") {c++}

						if (i < 4 && t[i+1][y] === "l") {c++}

						if (i < 4 && y < 3 && t[i+1][y+1] === "l") {c++}

						return c;
					}

				})(d);

				this.render(el, t)
			},
			firstRender : function(){
				var di = document.createElement("div");
					renderString = '<div class="boomjs">' + 
										'<div id="boomjs-dileiwei">' +
										'</div>' +
										'<form action="#" style="display: block;text-align: center;">' +
											'<input type="text">' +
											'<button  style="font-size: 30px" id="boomjs-resest">重置</button>' +
										'</form>' +
								   '</div>"';

				di.innerHTML = renderString;
				document.body.append(di);
			},
			render : function(el, t) {
				var elem = tool.getelement(el),
					uri = { url:0, biaoji:0},
					uu = "<ul>";

				for (var i = 0; i < 5; i++) {
					uu+="<li>";
					for (var y = 0; y < 4; y++) {
						if (t[i][y] === "l") {
							uri.url ='<img src="di.png" />';
							uri.biaoji = 1;
						} else {
							uri.url= t[i][y];
							uri.biaoji=0;
						}
						uu+="<span zhadan=" + uri.biaoji +">" + uri.url + "</span>";

						if(y === 3) {
							uu+="</li>"
						}
					}

					if(i === 4) {
						uu+="</ul>"
					}
				}

				elem.innerHTML = uu;
				
			},
			boomEvent : function(el, _count){

				var counts;

				document.getElementById("boomjs-resest").addEventListener("click",function(){

					let inputNode = this.previousSibling;

					while (inputNode.nodeName === '#text') {
						inputNode=inputNode.previousSibling;
					}
					counts = inputNode.value;

					if (counts > 20) {
						alert("地雷数最大只有20个");
						return 
					}

					counts = counts || _count;
					boomClass.boomCompute(counts, el);
				});	

				tool.getelement(el).addEventListener("click", function(){

					event.target.classList.add("dd");

					if (event.target.getAttribute("zhadan") === "1") {alert("踩到炸弹了！！")}

				})
			} 
		};

		// 入口
		var Boom = function(par){
			this.count =  par.count || 10;
			this.el = "boomjs-dileiwei";
		}

		// 方法
		Boom.prototype = {
			constructor : "Boom",
			init : function(){

				boomClass.firstRender();  // 初始化静态html 
		
				boomClass.boomEvent(this.el, this.count) // 添加dom事件

				boomClass.boomCompute(this.count, this.el); // 渲染地雷数据

			}
		}
		
		// 出口暴露
		global.Boom = Boom;

	})(this);