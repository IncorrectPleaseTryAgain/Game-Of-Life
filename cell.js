
class Cell {

    constructor(x, y, w, h, r, c, alive = 0) {

        this.origin = createVector(x, y);
        this.dimention = createVector(w, h);
        this.index = createVector(r, c);

        this.alive = alive;
        this.toggled = false;

        this.R = random(255);
        this.G = random(255);
        this.B = random(255);
        this.A = 225;
    }

    draw() {

        push();
        fill(0);
        strokeWeight(1);
        stroke(255, 10);
        if(this.alive) {
            _colorCells? fill(this.R, this.G, this.B, this.A) : fill(255);
        }
        rect(this.origin.x, this.origin.y, this.dimention.x, this.dimention.y);
        pop();
    }

    /* SETTERS */

    setToggled(state) {
        this.toggled = state;
    }

    setStatus(status) {
        this.alive = status;
    }

    /* GETTERS */
    
    getOrigin() {
        return this.origin;
    }

    getDimention() {
        return this.dimention;
    }

    getIndex() {
        return this.index;
    }

    getStatus() {
        return this.alive;
    }

    getToggled() {
        return this.toggled;
    }


    /* UTILITY FUNCTIONS */
    toggle() {
        if(!this.toggled) {

            this.alive? this.alive = 0 : this.alive = 1;
            this.toggled = true;
        }

    }
};