/**
 * Created by wf on 2019/3/30.
 */
var bar = {
    /*
     * 插件初始化
     * content 需要渲染的容器
     * nameArr 状态名数组
     * colors 颜色定义 该值为对象 支持四个属性 {notCircle,notLine,yesCircle,yesLine}
     * ok   选中的个数
     */
    init: function (content, nameArr, ok, colors) {
        var oks = arguments[2] ? arguments[2] : 0;
        var color = arguments[3] ? arguments[3] : null;
        this.content = content;
        this.names = nameArr;
        this.number = nameArr.length;
        content.style.padding = '15px';
        this.width = content.offsetWidth - 30;
        this.nameWidth = this.width / this.number;
        this.ok = oks;
        //设置进度条宽度
        this.styles = "width:" + this.width + "px;" + "position:relative;display:inline-block;";
        this.lineWidth = (this.width - (this.number * 15)) / (this.number - 1);
        var state = this.draw();
        if (color !== null && state) {
            var notLine =this.getChildRenByClass(content,'line-no'),
                    // document.getElementsByClassName("line-no"),
                notCircle = this.getChildRenByClass(content,'circle-no'),
                yesLine = this.getChildRenByClass(content,'line-ok'),
                yesCircle = this.getChildRenByClass(content,'circle-ok');
            console.log(notLine);
            this.setCircleColor(notCircle, color.notCircle);//未选中的圆的颜色
            this.setLineColor(notLine, color.notLine);//未选中的线条的颜色
            this.setCircleColor(yesCircle, color.yesCircle);//选择的圆颜色
            this.setLineColor(yesLine, color.yesLine);//选中的线条的颜色
        }
        this.windowResize(content, nameArr, ok, colors);
    },
    //开始渲染进度条
    draw: function () {
        var html = "<div style='" + this.styles + "'>";
        var circleOk = "<div class='circle-ok'></div>";
        var lineOk = "<div class='line-ok' style='width: " + this.lineWidth + "px'></div>";
        var circle = "<div class='circle-no'></div>";
        var line = "<div class='line-no' style='width: " + this.lineWidth + "px'></div>";
        if (this.number > 0) {
            for (var i = 1; i <= this.number; i++) {
                if (i === 1) {
                    if (this.ok > 0) {
                        html += circleOk;
                    } else {
                        html += circle;
                    }
                } else {
                    if (i <= this.ok) {
                        html += lineOk + circleOk;
                    } else {
                        html += line + circle;
                    }
                }
            }
            for (var j = 0; j < this.number; j++) {
                var width = (this.nameWidth) + "px";
                if (j === 0) {
                    html += "<div class='name' style='left:-10px;text-align:left;width:" + width + "'>" + this.names[j] + "</div>";
                } else if (j === (this.number - 1)) {
                    html += "<div class='name' style='right: -5px;text-align:right;width:" + width + "'>" + this.names[j] + "</div>";
                } else {
                    var left = (this.lineWidth * j) + (15 * j) - (this.nameWidth / 2 - 5) + "px";
                    html += "<div class='name' style='left:" + left + ";text-align:center;min-width:" + width + "'>" + this.names[j] + "</div>";
                }
            }
        }
        html += "</div>";
        this.content.innerHTML = html;
        return true;
    },
    //颜色设置 圆形
    setCircleColor: function (objArr, color) {
        if (objArr.length > 0) {
            for (var i = 0; i < objArr.length; i++) {
                objArr[i].style.backgroundColor = color;
            }
        }
    },
    //颜色设置 进度线条border-bottom
    setLineColor: function (objArr, color) {
        if (objArr.length > 0) {
            for (var i = 0; i < objArr.length; i++) {
                objArr[i].style.borderBottomColor = color;
            }
        }
    },
    //监听重载
    windowResize: function (content, nameArr, ok, colors) {
        window.onresize = function () {
            bar.init(content, nameArr, ok, colors)
        }
    },
    //获取子元素
    getChildRenByClass: function (parent, ele,num) {
        var _ele = Array.prototype.slice.call(parent.childNodes), eleArray = [];
        for (var index = 0, len = _ele.length; index < len; index++) {
            if (_ele[index].nodeType == 1) {
                eleArray.push(_ele[index]);
            }
        }
        if (arguments.length === 2) {
            if (typeof arguments[1] === "string") {
                _ele = Array.prototype.slice.call(parent.getElementsByClassName(arguments[1]));
                return _ele;
            } else if (typeof arguments[1] === "number") {
                return eleArray[arguments[1]];
            }
        } else {
            _ele = Array.prototype.slice.call(parent.getElementsByClassName(ele));
            return _ele[num];
        }
    }
};
