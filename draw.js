  document.addEventListener('DOMContentLoaded', () => {

    let draw = false;
    let eraser = false;


    let points = [];
    let lines = [];
    let svg = null;

    function render()
    {

      // create the selection area
      svg = d3.select('#area')
              .attr('height', window.innerHeight)
              .attr('width', window.innerWidth);

      svg.on('mousedown', function() {
          if(!draw)
          {
            draw = true;
          }
          else
          {
            draw = false;
          }
          const coords = d3.mouse(this);
          draw_point(coords[0], coords[1], false);
      });



      svg.on('mousemove', function() {
          if (!draw)
              return;
          const coords = d3.mouse(this);
          draw_point(coords[0], coords[1], true);
      });

      document.querySelector('#erase').onclick = () => {
          for (let i = 0; i < points.length; i++)
              points[i].remove();
          for (let i = 0; i < lines.length; i++)
              lines[i].remove();
          points = [];
          lines = [];
      }

      document.querySelector('#eraser').onclick = () =>{
        if(!eraser) {
          eraser = true;
          const e = document.getElementById('eraser')
          e.className = 'btn btn-success';
        }
        else {
          eraser= false;
          const e = document.getElementById('eraser')
          e.className = 'btn btn-dark';
        }
      }

    }

    function draw_point(x, y, connect)
    {
      if(eraser)
        var color = 'white';
      else
        var color = document.querySelector('#color').value;

      if (connect) {
          const last_point = points[points.length - 1];
          const line = svg.append('line')
                          .attr('x1', last_point.attr('cx'))
                          .attr('y1', last_point.attr('cy'))
                          .attr('x2', x)
                          .attr('y2', y)
                          .attr('stroke-width', 5 * 2)
                          .style('stroke', color);
          lines.push(line);
      }

      const point = svg.append("circle")
                       .attr('cx', x)
                       .attr('cy', y)
                       .attr('fill', color)
                       .attr('r', 5);
      points.push(point);


    }

    render();

  });
