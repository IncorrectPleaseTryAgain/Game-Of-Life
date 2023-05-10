
class Grid {

    constructor() {
        this.grid = [];

        this.initialize();
    }

    initialize() {

        this._numRows = floor(height / _size);
        this._numColumns = floor(width / _size);

        let w = width / this._numColumns;
        let h = height / this._numRows;

        let x = 0;
        let y = 0;
        
        for(let r = 0; r < this._numRows; r++) {
            this.grid[r] = [];

            for(let c = 0; c < this._numColumns; c++) {
                this.grid[r][c] = new Cell(x, y, w, h, r, c);

                x += w;
            }

            x = 0;
            y += h;
        }
    }

    update() {        
        
        this.grid = getNextGeneration(this.grid, this._numRows, this._numColumns);
        
        function getNextGeneration(grid, numRows, numColumns) {

            let next = [];

            for(let r = 0; r < numRows; r++) {

                next[r] = [];
                
                for(let c = 0; c < numColumns; c++) {

                    let numLiveNeighbors = 0;

                    if(getNeighborN(r, c, grid, numRows).getStatus() == 1) { numLiveNeighbors++; }
                    if(getNeighborS(r, c, grid, numRows).getStatus() == 1) { numLiveNeighbors++; }
                    if(getNeighborE(r, c, grid, numColumns).getStatus() == 1) { numLiveNeighbors++; }
                    if(getNeighborW(r, c, grid, numColumns).getStatus() == 1) { numLiveNeighbors++; }

                    if(getNeighborSE(r, c, grid, numRows, numColumns).getStatus() == 1) { numLiveNeighbors++; }
                    if(getNeighborSW(r, c, grid, numRows, numColumns).getStatus() == 1) { numLiveNeighbors++; }
                    if(getNeighborNW(r, c, grid, numRows, numColumns).getStatus() == 1) { numLiveNeighbors++; }
                    if(getNeighborNE(r, c, grid, numRows, numColumns).getStatus() == 1) { numLiveNeighbors++; }

                    let origin = grid[r][c].getOrigin();
                    let dimention = grid[r][c].getDimention();

                    
                    if(grid[r][c].getStatus() == 1) {

                        numLiveNeighbors < 2 || numLiveNeighbors > 3? next[r][c] = new Cell(origin.x, origin.y, dimention.x, dimention.y, r, c, 0)
                                                                    : next[r][c] = new Cell(origin.x, origin.y, dimention.x, dimention.y, r, c, 1);
                    } 
                    else if(grid[r][c].getStatus() == 0){

                        numLiveNeighbors == 3? next[r][c] = new Cell(origin.x, origin.y, dimention.x, dimention.y, r, c, 1)
                                             : next[r][c] = new Cell(origin.x, origin.y, dimention.x, dimention.y, r, c, 0);
                    }

                }
            }

            return next;

            function getNeighborN(r, c, grid, numRows) {
                if(r == 0) {
                    return grid[numRows - 1][c];
                }

                return grid[r - 1][c];
            }
            
            function getNeighborS(r, c, grid, numRows) {
                if(r == numRows - 1) {
                    return grid[0][c];
                }

                return grid[r + 1][c];
            }

            function getNeighborE(r, c, grid, numColumns) {
                if(c == numColumns - 1) {
                    return grid[r][0];
                }

                return grid[r][c + 1];
            }

            function getNeighborW(r, c, grid, numColumns) {
                if(c == 0) {
                    return grid[r][numColumns - 1];
                }

                return grid[r][c - 1];
            }

            function getNeighborNE(r, c, grid, numRows, numColumns) {
                let cellE = getNeighborE(r, c, grid, numColumns);
                return getNeighborN(cellE.getIndex().x, cellE.getIndex().y, grid, numRows);
            }

            function getNeighborSE(r, c, grid, numRows, numColumns) {
                let cellE = getNeighborE(r, c, grid, numColumns);
                return getNeighborS(cellE.getIndex().x, cellE.getIndex().y, grid, numRows);
            }

            function getNeighborSW(r, c, grid, numRows, numColumns) {
                let cellW = getNeighborW(r, c, grid, numColumns);
                return getNeighborS(cellW.getIndex().x, cellW.getIndex().y, grid, numRows);
            }

            function getNeighborNW(r, c, grid, numRows, numColumns) {
                let cellW = getNeighborW(r, c, grid, numColumns);
                return getNeighborN(cellW.getIndex().x, cellW.getIndex().y, grid, numRows);
            }
        }
    }

    draw() {
        for(let r = 0; r < this._numRows; r++) {
            for(let c = 0; c < this._numColumns; c++) {
                this.grid[r][c].draw();
            }
        }
    }

    
    /* UTILITY FUNCTIONS */
    getCellAtPos(x, y) {

        let r = floor(y / (height / this._numRows));
        let c = floor(x / (width / this._numColumns));

        return this.grid[r][c];
    }

    /* EVENT FUNCTIONS */
    clear() {
        for(let r = 0; r < this._numRows; r++) {
            for(let c = 0; c < this._numColumns; c++) {
                this.grid[r][c].setStatus(0);
            }
        }
    }

    Random() {
        for(let r = 0; r < this._numRows; r++) {
            for(let c = 0; c < this._numColumns; c++) {
                this.grid[r][c].alive = floor(random(2));
            }
        }
    }

};