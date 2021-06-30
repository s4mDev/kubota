
if ($(window).width() >= '768') {
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);
        
        // Set map definition
        chart.geodata = am4geodata_worldLow;
        
        // Set projection
        chart.projection = new am4maps.projections.Miller();
        
        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        
        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];
        
        // Make map load polygon (like country names) data from GeoJSON
        polygonSeries.useGeodata = true;
        
        // Configure series
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#121212");
        polygonTemplate.stroke = am4core.color("rgba(235,186,135,0.35)");
        polygonTemplate.nonScalingStroke = true;
        
        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#121212");
    
        chart.maxZoomLevel = 1;
        
        // Add image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.data = [ {
            "title": "Washington",
            "latitude": 40.7142,
            "longitude": -74.059
        }];
        
        // add events to recalculate map position when the map is moved or zoomed
        chart.events.on( "ready", updateCustomMarkers );
        chart.events.on( "mappositionchanged", updateCustomMarkers );
        
        // this function will take current images on the map and create HTML elements for them
        function updateCustomMarkers( event ) {
          
            // go through all of the images
            imageSeries.mapImages.each(function(image) {
                // check if it has corresponding HTML element
                if (!image.dummyData || !image.dummyData.externalElement) {
                // create onex
                image.dummyData = {
                    externalElement: createCustomMarker(image)
                };
                }
            
                // reposition the element accoridng to coordinates
                var xy = chart.geoPointToSVG( { longitude: image.longitude, latitude: image.latitude } );
                image.dummyData.externalElement.style.top = xy.y + 'px';
                image.dummyData.externalElement.style.left = xy.x + 'px';
            });
        
        }
        
        // this function creates and returns a new marker element
        function createCustomMarker( image ) {
          
            var chart = image.dataItem.component.chart;
            
            // create holder
            var holder = document.createElement( 'div' );
            holder.className = 'map-marker';
            holder.title = image.dataItem.dataContext.title;
            holder.innerHTML = '<div class="map-tooltip">'
                                + '<div class="map-tooltip__title">'
                                    +'<span class="map-tooltip__title_white"> Kimono! The Artistry of </span>'
                                    +'<span class="map-tooltip__title_yellow">Itchiku Kubota</span>'
                                + '</div>'
                                + '<div class="map-tooltip__info">'
                                    + '<div class="map-tooltip__item"><div class="map-tooltip__name">Country:</div> <div class="map-tooltip__value">USA</div></div>'
                                    + '<div class="map-tooltip__item"><div class="map-tooltip__name">City:</div> <div class="map-tooltip__value">Utica, New York</div></div>'
                                + '</div>'
                                + '<div class="map-tooltip__date">7.02.2018 - 13.05.2018</div></div>';
            holder.style.position = 'absolute';
            
            // maybe add a link to it?
            if ( undefined != image.url ) {
                holder.onclick = function() {
                    window.location.href = image.url;
                };
                holder.className += ' map-clickable';
            }
          
            // append the marker to the map container
            chart.svgContainer.htmlElement.appendChild( holder );
            
            return holder;
        }
        
        }); // end am4core.ready()
} else {
    am4core.ready(function() {

        // Themes begin
        am4core.useTheme(am4themes_animated);
        // Themes end
        
         // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);
        
         // Set map definition
         chart.geodata = am4geodata_worldLow;
        
         // Set projection
         chart.projection = new am4maps.projections.Miller();
        
        // Create map polygon series
        var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
        // });
        
        // Make map load polygon data (state shapes and names) from GeoJSON
        polygonSeries.useGeodata = true;

        // Remove Antarctica
        polygonSeries.unlistedAreasAlpha = 0;
        // Exclude Antartica
        polygonSeries.exclude = ["AQ"];

        chart.seriesContainer.draggable = false;
        chart.seriesContainer.resizable = false;

        chart.homeZoomLevel = 3;
        chart.homeGeoPoint = { longitude: -70, latitude: 40 };

        chart.maxZoomLevel = 3;
        
        // Add image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());
        imageSeries.mapImages.template.propertyFields.longitude = "longitude";
        imageSeries.mapImages.template.propertyFields.latitude = "latitude";
        imageSeries.data = [ {
            "title": "Washington",
            "latitude": 40.7142,
            "longitude": -74.059
        }];
        
        // add events to recalculate map position when the map is moved or zoomed
        chart.events.on( "ready", updateCustomMarkers );
        chart.events.on( "mappositionchanged", updateCustomMarkers );
        
        // this function will take current images on the map and create HTML elements for them
        function updateCustomMarkers( event ) {
          
            // go through all of the images
            imageSeries.mapImages.each(function(image) {
                // check if it has corresponding HTML element
                if (!image.dummyData || !image.dummyData.externalElement) {
                // create onex
                image.dummyData = {
                    externalElement: createCustomMarker(image)
                };
                }
            
                // reposition the element accoridng to coordinates
                var xy = chart.geoPointToSVG( { longitude: image.longitude, latitude: image.latitude } );
                image.dummyData.externalElement.style.top = xy.y + 'px';
                image.dummyData.externalElement.style.left = xy.x + 'px';
            });
        
        }
        
     // this function creates and returns a new marker element
     function createCustomMarker( image ) {
          
        var chart = image.dataItem.component.chart;
        
        // create holder
        var holder = document.createElement( 'div' );
        holder.className = 'map-marker';
        holder.title = image.dataItem.dataContext.title;
        holder.innerHTML = '<div class="map-tooltip">'
                            + '<div class="map-tooltip__title">'
                                +'<span class="map-tooltip__title_white"> Kimono! The Artistry of </span>'
                                +'<span class="map-tooltip__title_yellow">Itchiku Kubota</span>'
                            + '</div>'
                            + '<div class="map-tooltip__info">'
                                + '<div class="map-tooltip__item"><div class="map-tooltip__name">Country:</div> <div class="map-tooltip__value">USA</div></div>'
                                + '<div class="map-tooltip__item"><div class="map-tooltip__name">City:</div> <div class="map-tooltip__value">Utica, New York</div></div>'
                            + '</div>'
                            + '<div class="map-tooltip__date">7.02.2018 - 13.05.2018</div></div>';
        holder.style.position = 'absolute';
        
        // maybe add a link to it?
        if ( undefined != image.url ) {
            holder.onclick = function() {
                window.location.href = image.url;
            };
            holder.className += ' map-clickable';
        }
      
        // append the marker to the map container
        chart.svgContainer.htmlElement.appendChild( holder );
        
        return holder;
    }
        
        // Configure series tooltip
        var polygonTemplate = polygonSeries.mapPolygons.template;
        polygonTemplate.tooltipText = "{name}: {value}";
        polygonTemplate.nonScalingStroke = true;
        polygonTemplate.fill = am4core.color("#121212");
        polygonTemplate.stroke = am4core.color("rgba(235,186,135,0.35)");
        
        // Create hover state and set alternative fill color
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#121212");
        
        }); // end am4core.ready()
}
