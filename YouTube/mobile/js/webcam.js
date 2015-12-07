/**
 * Created by Ben on 05/12/2015.
 */
var video = document.querySelector('video');
var canvas = document.getElementById('photo');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

var DELAY = 3500

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function capture() {
    ctx.drawImage(video, 0, 0);
    var img = document.createElement('img');
    var dataURL = canvas.toDataURL('img/png');
    img.src = dataURL;
    console.log(img.src);
    upload(dataURItoBlob(dataURL))
        // document.body.appendChild(img)
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {
        type: mimeString
    });
}

function detect(imageDataBlob) {
    return $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair",
            beforeSend: function(xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", 'application/octet-stream');
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",
                    choose(["06b15672a0824d9baf9a6bb436107aad", "eb6e0170133744c4a38c511ff5074565", "2e87d66f93c241dd8ec805d09c38f92b", "f7b776d5d3a84e3a9f48f3ff12d067af"]));
            },
            type: "POST",
            // Request body
            data: imageDataBlob,
            processData: false,
            timeout: DELAY - 1000
        })
        .done(function (data) {
            console.log("success");
            console.log(data)
        })
        .fail(function (e) {
            console.log(e)
        });
}

function emotion(imageDataBlob) {
    return $.ajax({
            url: "https://api.projectoxford.ai/emotion/v1.0/recognize",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", 'application/octet-stream');
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key",
                    choose(["4f40e5da04db40289f7fe28b1e5b9ae7", "d9cf482cc7d14f2cb4c3ac478e82bf33", "e1276d5f08ae438ca10b0a7c19ef4e8c", "c14f3203d1904ec298aca7c44efd89dd", "3debebcc0f37452aa435e081683b4faa"]));
            },
            type: "POST",
            // Request body
            data: imageDataBlob,//.replace(/^data:image.+;base64,/, ""),
            processData: false,
            timeout: DELAY - 1000
        })
        .done(function (data) {
            console.log("success");
            console.log(data)
        })
        .fail(function (e) {
            console.log(e)
        });
}

//JSON data

      function upload(imageDataBlob) {
    var e = emotion(imageDataBlob)
    var d = detect(imageDataBlob)
    e.then(function (eData) {
        d.then(function (dData) {
            var i = 0
            var people = []
            $("#messages").html("<ol>" + dData.map(function (dd) {
                    var ee = eData[i++]
                    var max = 0
                    var maxEmotion = ""
                    Object.keys(ee.scores).forEach(function (k) {
                        var x = ee.scores[k]
                        if(x > max) {
                            maxEmotion = k
                            max = x
                        }
                    })

                    if (ee) {
                      var person = {
                          position: dd.faceRectangle,
                          age: dd.faceAttributes.age,
                          gender: dd.faceAttributes.gender,
                          emotion: maxEmotion,
                          beard: Math.round(dd.faceAttributes.facialHair.beard * 10) / 10,
                          moustache: Math.round(dd.faceAttributes.facialHair.moustache * 10) / 10,
                          smile: dd.faceAttributes.smile == null ? 0 : Math.round(dd.faceAttributes.smile * 10) / 10,
                          happiness: ee.scores.happiness
                      }
                        chart(person.happiness, i-1)
                      people.push(person)
                        return "<li>" +
                            "<ul>" +
                            "<li>" + (person.gender=="male"?"Male":"Female") + " aged " + person.age + "</li>" +
                            "<li>Beard: " + person.beard + "</li>" +
                            "<li>Moustache: " + person.moustache + "</li>" +
                            "<li>Smile: " + person.smile + "</li>" +
                            "<li>Emotion: " + maxEmotion + " </li>" +
                            "</ul>"
                            + "</li>"
                        
                      }
                }) + "</ol>")

            if(!justSwitched)
                updateVideo(people)
            else
                justSwitched = false

            $(".facebox").remove()
            people.forEach(function(p) {
                var factor = $("video").width() / $("canvas").width()
                var pos = p.position;
                var top = Math.round(pos.top * factor);
                var left = Math.round(pos.left * factor);
                var width = Math.round(pos.width * factor);
                var height = Math.round(pos.height * factor);
                var facebox = $("<div class='facebox' style='border: 3px solid "
                    + (p.gender == 'male' ? 'blue' : 'pink') +
                    "; position: absolute'></div>")
                    .css({top: top + "px", left: left + "px", width: width + "px", height: height + "px"})
                $("#webcam").append(facebox)
            })
            setTimeout(function () {
                $(".facebox").remove()
            }, 1000)



            //Pietro
            var ages = []
            var genders = []
            people.forEach(function(p) {
                ages.push(p.age);
                genders.push(p.gender == 'male' ? 'm' : 'f')
            })

            $.get("http://54.88.61.20/?num=" + people.length + "&ages=" + ages.join(',') + "&genders=" + genders.join(','), function(data) {

                try {
                    if (data.matches) {
                        $(".suggestions").empty().append("<p style='font-size: smaller; font-variant: small-caps;margin:0;padding:0'>You may also like:</p>").append("<p>" + data.matches.name + "<p>").append("<img style='height: " + 70 + "px; width: " + 80 + "px;' src='http://54.88.61.20/" + data.matches.thumb + "'/>");
                    }

                } catch (e) {

                }




            });
            //End Pietro

        })
    })
}


navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;
navigator.getUserMedia({video: true}, function (stream) {
    if (window.URL) {
        video.src = window.URL.createObjectURL(stream);
    } else {
        video.src = stream; // Opera.
    }

    video.onerror = function (e) {
        stream.stop();
    };

    stream.onended = function () {
    };

    var alreadyDone = false
    function launch() {
        if(!alreadyDone) {
            alreadyDone = true
            console.log("Setting height", video.videoHeight)
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            setInterval(capture, DELAY)
            capture()
        }
    }

    video.onloadedmetadata = launch;

    // Since video.onloadedmetadata isn't firing for getUserMedia video, we have
    // to fake it.
    setTimeout(launch, 4000);
}, function () {
    console.log("No video :(")
});