    // 2. This code loads the IFrame Player API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;

    var videos = {
        'sex in the city': 'a6738DN4I3s',
        'game of thrones': 'y0OqdTUf4sc',
        'american psycho': 'qQx_AN02XuM',
        'top gear': 'FssQhpAqv1I',
        'top gear 2': 'DrUVMdkb4_k',
        'football': 'NurlfAcY378',
        'forrest gump': 'wvJ4wh1kwR8',
        'the prestige': 'ijXruSzfGEc',
        'star wars': 'tUW7EDJmWUA',
        'fifty': 'SfZWFDs0LxA',
        'gopro': 'wTcNtgA6gHs',
        'national': 'cr-er44rr2M',
        'bond': 'BsBd9tPK4uE',
        'mission': 'TTrUyOvsHeM',
        'wing': 'o6mPnvrBYrE',
    }


    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: window.innerHeight,
            width: window.innerWidth,
            videoId: videos['national'],
            startSeconds: 8,
            suggestedQuality: 'highres',


            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange

            }
        });

    }

    function updateVideo(people) {
        if (people.length == 1 && people[0].gender == 'male') {
            changeVideo('national')
            // $("#adtext").empty().append($("<p></p>").text('Buy The National Geographic Movie'))
        } 
        else if (people.length && people[0].gender == 'female') {
            changeVideo('sex in the city')
        } else if (people.length == 2) {
            changeVideo('mission')
            // $("#adtext").empty().append($("<p></p>").text('Buy The Mission Impossible Movie'))

        } else if (people.length == 3) {
            changeVideo('star wars')
        } else if (people.length > 4) {
            changeVideo('wing')
        }

    }

    var justSwitched = false
    function changeVideo(i) {
        console.log("change", i)
        var next = videos[i]
        var current = player.getVideoData()['video_id'];
        if (next != current) {
            justSwitched = true
            player.loadVideoById({
                videoId: next,
                startSeconds: 8,
                suggestedQuality: 'highres',
                iv_load_policy: 3
            })
        }
    }




    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }



    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;

    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            // setTimeout(stopVideo, 6000);
            done = true;
        }
    }

    function stopVideo() {
        player.stopVideo();
    }
    