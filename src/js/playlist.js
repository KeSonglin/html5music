(function ($, root) {
    var $scope = $(document.body);
    var control;
    var $playList = $("<div class='play-list'>" +
        "<div class='list-header'>播放列表</div>" +
        "<ul class='list-wrapper'></ul>" +
        "<div class='btn-close'>关闭</div>" +
        "</div>");

    // 渲染播放列表dom
    function renderList(songList) {
        var html = '';
        for (var i = 0; i < songList.length; i++) {
            html += "<li><h3 >" + songList[i].song + "-<span>" + songList[i].singer + "</span></h3></li>"
        }
        $playList.find("ul").html(html);
        $scope.append($playList);
        bindEvent();
    }
    // 在播放列表中，给当前播放的音乐添加样式
    function show(controlmanager) {
        control = controlmanager;
        $playList.addClass("show");
        signSong(control.index);
    }
    // 绑定点击播放事件
    function bindEvent() {
        // 点击“关闭”， 隐藏播放列表
        $playList.on("click", ".btn-close", function () {
            $playList.removeClass("show")
        });
        $playList.find("li").on("click", function () {
            var index = $(this).index();
            signSong(index);
            control.index = index;
            $scope.trigger("play:change", [index, true]);
            $scope.find(".btn-play").addClass("playing");
            setTimeout(function () {
                $playList.removeClass("show")
            }, 200);
        });
    }
    function signSong(index) {
        $playList.find(".sign").removeClass("sign");
        $playList.find("ul li").eq(index).addClass("sign");
    }
    root.playList = {
        renderList: renderList,
        show: show
    };
})(window.Zepto, window.player || (window.player = {}))