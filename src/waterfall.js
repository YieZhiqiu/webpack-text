var curPage = 1
    var perPageCount = 3
    var colSumHeight = []
    var nodeWidth = $('.picitem').outerWidth(true)
    var colNum = parseInt($('.pic-ct').width()/$('.picitem').outerWidth(true))
    for(var i=0;i<colNum;i++){
        colSumHeight[i]=0
    }
    var isLoading = false

    start()


    function start(){

        getData(function(newsList){
            isLoading = true
            $.each(newsList,function(idx,news){
                var $node = getNode(news)
                $node.find('img').load(function(){
                    $('.pic-ct').append($node)
                    waterFallPlace($node)
                })
            })
        })
        isLoading = false
    }


    $("#load").click(function(){
        if(!isLoading) return
        start()


    })

    function getData(callback){
        $.ajax({
            url: 'http://platform.sina.com.cn/slide/album_tech',
            dataType: 'jsonp',
            jsonp:"jsoncallback",
            data: {
                app_key: '1271687855',
                num: perPageCount, // 一次要多少数据
                page: curPage  // 第几页
            }
        }).done(function(ret){
            if(ret && ret.status && ret.status.code === "0"){
                callback(ret.data);   //如果数据没问题，那么生成节点并摆放好位置
                curPage++
            }else{
                console.log('get error data');
            }
        });
    }


    function getNode (news){
        var html = ''
        html += '<li class = "picitem">';
        html +=  '<a href="'+ news.url +'" class="link"><img src=" '+ news.img_url +' " alt=""></a>';
        html += '</li>';
        return $(html)
    }


    function waterFallPlace($node){

        var minValue = Math.min.apply(null,colSumHeight)
        var minIndex = colSumHeight.indexOf(minValue)

        $node.css({
            left: nodeWidth*minIndex,
            top: minValue,
            opacity: 1
        })

        colSumHeight[minIndex] = $node.outerHeight(true) + colSumHeight[minIndex];
        $('.pic-ct').height(Math.max.apply(null,colSumHeight));
    }

 