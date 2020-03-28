$(function() {
    // 当鼠标进入的时侯放大图片
    function imgScale(ele) {
        $(ele).hover(function() {
            $(this).find('img').toggleClass('scale')
        })
    }
    imgScale('.lbt-left ul:last li')
    imgScale('.ab-left li')
    imgScale('.special-list li')
    imgScale('.artice-list a')
    imgScale('.ranking-img')

    // tab切换
    $('.artice-left li').click(function() {
        $(this).addClass('artice-box-border').siblings().removeClass('artice-box-border')
        let index = $(this).index()
        console.log(index)
        $('.news').eq(index).addClass('show').siblings().removeClass('show')
    })
    $('.news .content li').hover(function() {
        $(this).addClass('content-info').siblings().removeClass('content-info')
        $(this).find('p').addClass('show').parent().siblings().find('p').removeClass('show')
    })

    // 网站公共部分的tab切换
    $('.artice-right li').hover(function() {
        $(this).toggleClass('box-s')
    })
    $('.ranking-list li').hover(function() {
        $(this).toggleClass('box-s')
    })

    // 轮播图部分
    // 1.鼠标进入轮播图的时候将左右按钮显示出来并且修改left,right实现滑动显示
    $('.lbt-left div').hover(function() {
            $(this).find('span').fadeIn()
            $('.arr-l').css('left', '20px')
            $('.arr-r').css('right', '20px')
        }, function() {
            $(this).find('span').fadeOut()
            $('.arr-l').css('left', '80px')
            $('.arr-r').css('right', '80px')
        })
        //2.动态创建瞄点
    $('.lbt-left ul:first li').each(function(index, value) {
        let $p = $('<p></p>')
        if (index === 0) {
            $p.addClass('circle')
        }
        $('.lbt-left section').append($p)
    })
    let $num = 0
    let $circle = 0
        //3.点击瞄点的时候给当前的瞄点添加背景
    let $divWidth = $('.lbt-left div').innerWidth()
    $(window).resize(function() {
        $divWidth = $('.lbt-left div').innerWidth()
    })
    $('.lbt-left section p').click(function() {
            $(this).addClass('circle').siblings().removeClass('circle')
                // 4.点击瞄点的时候切换对应的图片
            let $index = $(this).index()
            $circle = $num = $index
            $('.lbt-left div ul').css({
                left: -$index * $divWidth
            })
        })
        // 5.克隆第一个li实现无缝滚动
    let cloneLi = $('.lbt-left div li:first').clone()
    $('.lbt-left div ul').append(cloneLi)
        // 6.给左右箭头添加点击事件
    $('.arr-r').click(function() {
        if ($num === 4) {
            $('.lbt-left div ul').css({
                'left': 0,
            })
            $num = 0
        }
        $num++
        $circle++
        if ($circle === 4) {
            $circle = 0
        }
        let $moveDistance = $num * $divWidth
        $('.lbt-left div ul').css({
            left: -$num * $divWidth
        })
        $('.lbt-left section p').eq($circle).addClass('circle').siblings().removeClass('circle')
    })
    $('.arr-l').click(function() {
            if ($num === 0) {
                $num = 4
                $('.lbt-left div ul').css('left', -$num * $divWidth)
            }
            $num-- //3
            $circle--
            if ($circle < 0) {
                $circle = 3
            }
            let $moveDistance = $num * $divWidth
            $('.lbt-left div ul').css({
                left: -$num * $divWidth
            })
            $('.lbt-left section p').eq($circle).addClass('circle').siblings().removeClass('circle')
        })
        // 7.自动播放
    var timer = setInterval(function() {
            $('.arr-r').click()
        }, 2000)
        // 8.鼠标进入停止轮播,鼠标离开开始轮播
    $('.lbt-left div').hover(function() {
        clearInterval(timer)
        timer = null
    }, function() {
        timer = setInterval(function() {
            $('.arr-r').click()
        }, 2000)
    })
})