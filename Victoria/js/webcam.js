/**
 * Created by Ben on 05/12/2015.
 */
var video = document.querySelector('video');
var canvas = document.getElementById('photo');
var ctx = canvas.getContext('2d');
var localMediaStream = null;

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

    return new Blob([ia], {type: mimeString});
}

function detect(imageDataBlob) {
    return $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/detect?returnFaceAttributes=age,gender,headPose,smile,facialHair",
            beforeSend: function (xhrObj) {
                // Request headers
                xhrObj.setRequestHeader("Content-Type", 'application/octet-stream');
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "84633bf2c350462ca105e4435aa317ae");
            },
            type: "POST",
            // Request body
            data: imageDataBlob,
            processData: false
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
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "e1276d5f08ae438ca10b0a7c19ef4e8c");
            },
            type: "POST",
            // Request body
            data: imageDataBlob,//.replace(/^data:image.+;base64,/, ""),
            processData: false
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
                          beard: dd.faceAttributes.facialHair.beard,
                          moustache: dd.faceAttributes.facialHair.moustache,
                          smile: dd.faceAttributes.smile
                      }
                      people.push(person)
                        return "<li>" +
                            "<ul>" +
                            "<li>Age: " + dd.faceAttributes.age + "</li>" +
                            "<li>Gender: " + dd.faceAttributes.gender + "</li>" +
                            "<li>Beard: " + dd.faceAttributes.facialHair.beard + "</li>" +
                            "<li>Moustache: " + dd.faceAttributes.facialHair.moustache + "</li>" +
                            "<li>Smile: " + dd.faceAttributes.smile + "</li>" +
                            "<li>Emotion: " + maxEmotion + " </li>" +
                            "</ul>"
                            + "</li>"
                        
                      }
                }) + "</ol>")

          updateVideo(people)

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
            setInterval(capture, 4000)
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