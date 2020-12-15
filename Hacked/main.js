const _rotations = [
    ( [ x, y ] ) => [ x, y ], // 0
    ( [ x, y ] ) => [ -y, x ], // 90
    ( [ x, y ] ) => [ -x, -y ], // 180
    ( [ x, y ] ) => [ y, -x ] // 270
];

const _reflect = ( [ x, y ] ) => [ -x, y ];

const _getx = ( [ x, _ ] ) => x;
const _gety = ( [ _, y ] ) => y;



const Polyomino = function( coords )
{

    this.coords = coords;
    this.color;

    this.normalize = function()
    {
        let minX = Math.min( ...this.coords.map( _getx ) );
        let minY = Math.min( ...this.coords.map( _gety ) );
        return this.translate( -minX, -minY );
    }

    this.clone = function()
    {
        let newShape = new Polyomino( this.coords );
        newShape.color = this.color;
        return newShape;
    }


    this.isEmpty = function()
    {
        return this.coords.length == 0;
    }

    //CCW rotation n times
    this.rotate = function( n )
    {
        let turns = n % 4;
        return new Polyomino( this.coords.map( _rotations[ turns ] ) );
    }

    //Reflect shape
    this.reflect = function()
    {
        return new Polyomino( this.coords.map( _reflect ) );
    }

    //Shift coords of Polyomino
    this.translate = function( dx, dy )
    {
        return new Polyomino( this.coords.map( ( [ x, y ] ) => [ x + dx, y + dy ] ) );
    }

    this.isDisjointFrom = function( other )
    {
        for ( outer of this.coords )
        {
            for ( inner of other.coords )
            {
                if ( outer[ 0 ] == inner[ 0 ] && outer[ 1 ] == inner[ 1 ] ) return false;
            };
        };
        return true;
    }

    this.concat = function( other )
    {
        // this.coords.push(other.coords).filter( (value, index, self) =>{
        //     return self.indexOf(value)===index;
        // } );
        this.coords = this.coords.concat( other.coords );
    }

    this.setColor = function( color )
    {
        this.color = color;
    }

    this.getWidth = function()
    {
        let xs = this.coords.map( _getx );
        return Math.max( ...xs ) - Math.min( ...xs );
    }

    this.getHeight = function()
    {
        let ys = this.coords.map( _gety );
        return Math.max( ...ys ) - Math.min( ...ys );
    }

    //return marx of height and width
    this.getSize = function()
    {
        return Math.max( this.getWidth(), this.getHeight() );
    }

    //return largest x coord
    this.getMaxX = function()
    {
        return Math.max( ...this.coords.map( _getx ) );
    }

    //return largest y coord
    this.getMaxY = function()
    {
        return Math.max( ...this.coords.map( _gety ) );
    }

    //return true if coord is in polyomino piece
    this.containsCoordinate = function( coord )
    {
        return this.coords.some( ( [ x, y ] ) => x == coord[ 0 ] && y == coord[ 1 ] );
    }
}

const hexominos = {
    "H_00": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 0, 4 ],
        [ 0, 5 ]
    ] ),
    "H_01": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 0, 4 ],
        [ 1, 4 ]
    ] ),
    "H_02": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 0, 4 ],
        [ 1, 3 ]
    ] ),
    "H_03": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 0, 4 ],
        [ 1, 2 ]
    ] ),
    "H_04": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 3 ],
        [ 1, 4 ]
    ] ),
    "H_05": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 2 ],
        [ 1, 3 ]
    ] ),
    "H_06": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 1 ],
        [ 1, 3 ]
    ] ),
    "H_07": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 0 ],
        [ 1, 3 ]
    ] ),
    "H_08": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 1 ],
        [ 1, 2 ]
    ] ),
    "H_09": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 3 ],
        [ 2, 3 ]
    ] ),
    "H_10": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 0, 3 ],
        [ 1, 2 ],
        [ 2, 2 ]
    ] ),
    "H_11": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 0, 3 ],
        [ 2, 3 ]
    ] ),
    "H_12": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 0, 2 ],
        [ 2, 3 ]
    ] ),
    "H_13": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 0, 1 ],
        [ 2, 3 ]
    ] ),
    "H_14": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 0, 0 ],
        [ 2, 3 ]
    ] ),
    "H_15": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 0, 1 ],
        [ 2, 2 ]
    ] ),
    "H_16": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 0, 2 ],
        [ 2, 2 ]
    ] ),
    "H_17": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 2, 2 ],
        [ 1, 3 ]
    ] ),
    "H_18": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 1, 0 ],
        [ 1, 3 ]
    ] ),
    "H_19": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 1, 4 ]
    ] ),
    "H_20": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ]
    ] ),
    "H_21": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ]
    ] ),
    "H_22": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ]
    ] ),
    "H_23": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 0, 2 ],
        [ 2, 2 ],
        [ 2, 3 ]
    ] ),
    "H_24": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 0, 2 ],
        [ 2, 2 ],
        [ 2, 1 ]
    ] ),
    "H_25": new Polyomino( [
        [ 1, 0 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 0, 1 ],
        [ 2, 2 ],
        [ 2, 3 ]
    ] ),
    "H_26": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 2, 2 ],
        [ 2, 3 ]
    ] ),
    "H_27": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 2, 3 ]
    ] ),
    "H_28": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 2 ],
        [ 2, 2 ],
        [ 2, 1 ]
    ] ),
    "H_29": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 1 ],
        [ 2, 1 ],
        [ 2, 2 ]
    ] ),
    "H_30": new Polyomino( [
        [ 1, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 1 ],
        [ 2, 1 ],
        [ 2, 2 ]
    ] ),
    "H_31": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 1, 3 ],
        [ 2, 3 ]
    ] ),
    "H_32": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 0, 2 ],
        [ 1, 0 ],
        [ 1, 1 ],
        [ 2, 0 ]
    ] ),
    "H_33": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 1, 2 ],
        [ 1, 0 ],
        [ 1, 1 ],
        [ 2, 1 ]
    ] ),
    "H_34": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 2, 2 ],
        [ 1, 0 ],
        [ 1, 1 ],
        [ 2, 1 ]
    ] ),
    "H_35": new Polyomino( [
        [ 0, 0 ],
        [ 0, 1 ],
        [ 1, 1 ],
        [ 1, 2 ],
        [ 2, 2 ],
        [ 2, 3 ]
    ] )
}

;

/*
Class: CPSC-335-05 Algorithms
Project 3: Hexomino 3 Color Convering
Team: BlaqBear
Members: Brian "BJ" Warfield
*/

//global variables
const GRID_CONTAINER = document.getElementById( 'Grid-container' )
const g_canvas = {
    cell_size: 25,
    width: 15,
    height: 15,
    region_coords: [] //populated during setup
};

const g_problem = {
    matrix: [],
    region: {},
    row_size: 0,
    pieceKeys: [],
    usedKeys: [],
    solution: [],
    colors: [ "red", "blue", "green", "yellow" ],
    colorIndex: 0,
    initialized: false,
    update: function()
    {
        if ( this.initialized )
        {
            if ( this.pieceKeys.length > 0 )
            {
                if ( this.solution.length < 1 )
                {
                    let matrixObj = this.matrix[ this.pieceKeys[ 0 ] ];
                    this.usedKeys.push( this.pieceKeys.shift() );
                    let p = matrixObj.piece[ matrixObj.index ];
                    matrixObj.index++;
                    p.setColor( this.colors[ this.colorIndex ] );
                    this.colorIndex = ( this.colorIndex + 1 ) % this.colors.length;
                    this.solution.push( p.clone() );

                    for ( piece of this.solution )
                    {
                        drawPolyomino( piece );
                    }
                }
                else
                {
                    let solutionRegion = new Polyomino( []  );
                    for ( piece of this.solution )
                    {
                        solutionRegion.concat( piece );
                    }

                    // console.log(solutionRegion);
                    // solutionRegion.setColor("black");
                    // drawPolyomino(tsolutionRegion);

                    let matrixObj = this.matrix[ this.pieceKeys[ 0 ] ];

                    let nextOpenCood;

                    for(let rcIndex = 0; rcIndex <  g_canvas.region_coords.length; rcIndex++ )
                    {
                        let rc = g_canvas.region_coords[rcIndex];
                        // console.log(rc);
                        if( !solutionRegion.containsCoordinate(rc) )
                        {
                            nextOpenCood = rc;
                            break;
                        }
                    }
                    let p;

                    while ( matrixObj.index < matrixObj.piece.length )
                    {
                        p = matrixObj.piece[ matrixObj.index ];
                        matrixObj.index++;
                        if ( solutionRegion.isDisjointFrom( p ))
                        {
                            // console.log("New Piece is Disjoint");
                            break;
                        }
                    }
                    if( matrixObj.index >= matrixObj.piece.length ){
                        // placement not found, backtrack
                        this.matrix[ this.pieceKeys[ 0 ] ].index = 0;
                        this.pieceKeys.unshift(this.usedKeys.pop());
                        clearPolyomino( this.solution[this.solution.length -1] );
                        this.solution.pop();
                    }
                    else
                    {
                        this.usedKeys.push( this.pieceKeys.shift() );
                        p.setColor( this.colors[ this.colorIndex ] );
                        this.colorIndex = ( this.colorIndex + 1 ) % this.colors.length;
                        this.solution.push( p.clone() );
                        for ( piece of this.solution )
                        {
                            drawPolyomino( piece );
                        }
                    }
                }
            }
        }
    }
};

//collection for grid cell dom nodes
let g_cellArray;

//helper function to select single cell dom node
const getCell = function( row, col )
{
    return g_cellArray[ ( row * g_canvas.width ) + col ];
}

//create grid with 3x3 hole in center. populate global variables
const makeGrid = function()
{
    GRID_CONTAINER.innerHTML = '';
    GRID_CONTAINER.style.setProperty( '--grid-rows', g_canvas.height );
    GRID_CONTAINER.style.setProperty( '--grid-cols', g_canvas.width );

    let cells = [];

    for ( let y = 0; y < g_canvas.height; y++ )
    {
        for ( let x = 0; x < g_canvas.width; x++ )
        {
            let cell = document.createElement( 'div' );

            //disabled 3x3 region
            if ( x > 5 && x < 9 && y > 5 && y < 9 )
            {
                cell.classList.add( "disabled" );
                cell.status = -1;
            }
            else
            {
                cell.status = 0;
                g_canvas.region_coords.push( [ x, y ] );
            }
            cell.classList.add( "grid-item" );

            GRID_CONTAINER.appendChild( cell );
            cells.push( cell );

        }

    }
    g_cellArray = cells;
}

const shuffle = function( array )
{
    let current = array.length
    let temp, target;

    // While there remain elements to shuffle…
    while ( current )
    {

        // Pick a remaining element…
        target = Math.floor( Math.random() * current-- );

        // And swap it with the current element.
        temp = array[ current ];
        array[ current ] = array[ target ];
        array[ target ] = temp;
    }

    return array;
}

const drawPolyomino = function( piece )
{
    // peice = peice.reflect().normalize();
    // console.log( piece );
    piece.coords.forEach( element =>
    {

        getCell( element[ 0 ], element[ 1 ] ).style.backgroundColor = piece.color;
        getCell( element[ 0 ], element[ 1 ] ).style.borderColor = piece.color;
    } );
}

const clearPolyomino = function( piece )
{
    piece.coords.forEach( element =>
    {
        getCell( element[ 0 ], element[ 1 ] ).style.backgroundColor = "white";
        getCell( element[ 0 ], element[ 1 ] ).style.borderColor = "gray";
    } );
}

//returns true is piece fits within region
const fitsInRegion = function( piece )
{

    if ( piece.getMaxY() < g_canvas.height && piece.getMaxX() < g_canvas.width )
    {
        return piece.coords.every( coord => g_problem.region.containsCoordinate( coord ) );
    }

    return false;
}

//returns array of all posible placements of a piece in the region
const enumeratePositions = function( piece )
{
    let positions = [];

    let orientations = [];

    for ( let rotation of [ 0, 1, 2, 3 ] )
    {
        for ( let reflect of [ false, true ] )
        {
            let pos = piece.rotate( rotation );
            if ( reflect ) pos = pos.reflect();
            orientations.push(pos.normalize());
        }
    }

    //only collect unisue orientations
    let unique = [];
    unique.push( orientations.shift() );


    for( let o of orientations )
    {
        let isDuplicate;

        for( let u of unique)
        {
            isDuplicate = u.coords.every( coord => o.containsCoordinate( coord ) );
            if(isDuplicate)break;
        }

        if ( !isDuplicate )
        {
            unique.push( o );
        }
    }

    unique.forEach( u =>
    {
        for ( let dx = 0; dx < g_canvas.width; dx++ )
        {
            for ( let dy = 0; dy < g_canvas.height; dy++ )
            {
                let pos = u.translate( dx, dy );
                if ( fitsInRegion( pos ) ) positions.push( pos );
            }
        }
    } );
    return positions;
}

let list =[];

const setup = function()
{
    makeGrid();
    g_canvas.frames = 0;
    // console.log( g_canvas.region_coords );

    g_problem.pieceKeys = shuffle( Object.keys( hexominos ) );
    g_problem.region = new Polyomino( g_canvas.region_coords );

    //generate template for matrix rows
    let rowTemplate = {};
    // for ( let index in hexominos )
    // {
    //     rowTemplate[ index ] = 0;
    // }
    // for ( let i = 0; i < g_canvas.region_coords.length; i++ )
    // {
    //     rowTemplate[ i ] = 0;
    // }
    for ( coord in g_canvas.region_coords )
    {
        rowTemplate[ g_canvas.region_coords[coord] ] = 0;
    }



    for ( let [ key, piece ] of Object.entries( hexominos ) )
    {
        g_problem.matrix[ key ] = {
            "piece":[],
            // "position": [],
            "index": 0
        };

        let positions = enumeratePositions( piece );
        // console.log(positions);
        for ( let pos of positions )
        {
            g_problem.matrix[ key ].piece.push( pos.clone() );
            // console.log(pos);
            // let row = new Array( g_canvas.region_coords.length ).fill( 0 );

            // for ( let coord of pos.coords )
            // {
            //     let index = g_canvas.region_coords.findIndex( x => coord[ 0 ] == x[ 0 ] && coord[ 1 ] == x[ 1 ] );
            //     //   console.log( index );
            //     row[ index ] = 1;
            // }
            // console.log(row);
            // g_problem.matrix[ key ][ "position" ].push( row.slice() );
        }
    }

    g_problem.initialized = true;
    console.log(g_problem);
    // console.log(fitsInRegion(hexominos[ "H_00" ]));

    // drawPolyomino( hexominos[ "H_35" ], "blue" );
    // list = enumeratePositions(hexominos[ "H_35" ]);
    // console.log(list);

    while(g_problem.pieceKeys.length > 0){
        g_problem.update();
    }

}

const update = function()
{
    // console.log(g_canvas.frames);
    g_canvas.frames++;
    // if(list.length > 0)
    // {
    //     clearPolyomino(list[0], "blue");
    //     list.shift();
    //     if(list.length > 1) drawPolyomino(list[0], "blue");
    // }
}


setup();

let mainLoop = setInterval( update, 5, this );