function GraphBuilder(){
}
GraphBuilder.prototype = {
    buildGraphs: function(){
        buildSplineGraph();
        buildPositionGraph();
        buildAudioGraph();
        buildColorGraph();
    }
}