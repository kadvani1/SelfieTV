/**
 * Created by Ben on 06/12/2015.
 */
var smileSeries = [new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries(), new TimeSeries()]
var colours = ['#00ff00', '#ff7c11', '#0000ff']

function chart(x, n) {
    smileSeries[n].append(new Date().getTime(), x)
}

$(function createTimeline() {
    var chart = new SmoothieChart({maxValue:1,minValue:0, millisPerPixel:80,grid:{fillStyle:'rgba(0,0,0,0.29)',strokeStyle:'transparent',borderVisible:false},timestampFormatter:SmoothieChart.timeFormatter}),
        canvas = document.getElementById('chart')
    smileSeries.forEach(function (s) {
        chart.addTimeSeries(s, {lineWidth:2.5,strokeStyle:choose(colours)});
        s.append(new Date().getTime(), 0)
    })
    chart.streamTo(canvas, 500);
})