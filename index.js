const XAXIS_PADDING = 10;
const YAXIS_PADDING = 25;
const DURATION = 1000 * 30;
const MAX_VALUE = 100;
const Y_TICK_COUNT = 5;
const X_TICK_COUNT = 10;
const TOP_PADDING = 15;
const EX_TEXT = "00:00";

class LineChart {
    constructor(id) {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext('2d');

        this.canvasWidth = this.canvas.clientWidth;
        this.canvasHeight = this.canvas.clientHeight;
        this.chartWidth = this.canvasWidth - YAXIS_PADDING;
        this.chartHeight = this.canvasHeight - XAXIS_PADDING - TOP_PADDING;

        this.xFormatWidth = this.ctx.measureText(EX_TEXT).width;
        this.setTime();
        this.drawChart();
    }

    setTime = () => {
        this.endTime = Date.now();
        this.startTime = this.endTime - DURATION;
        this.setXInterval();
    }

    setXInterval = () => {
        let xPoint = 0;
        let timeInterval = 3000;

        while (true) {
            xPoint = (timeInterval / DURATION) * this.chartWidth;
            console.log(timeInterval)
            console.log(timeInterval / DURATION)
            console.log(xPoint)
            console.log(this.xFormatWidth)

            if (xPoint > this.xFormatWidth) {
                break;
            }
            timeInterval *= 2;
        }

        this.xTimeInterval = timeInterval;
    }

    drawChart = () => {
        const {
            ctx, canvasWidth, canvasHeight, chartHeight
        } = this;

        ctx.beginPath();
        ctx.moveTo(YAXIS_PADDING, TOP_PADDING);

        //draw YAXIS
        ctx.lineTo(YAXIS_PADDING, chartHeight + TOP_PADDING)

        const yInterval = MAX_VALUE / (Y_TICK_COUNT - 1);
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";

        for (let i = 0; i < Y_TICK_COUNT; i++) {
            const value = i * yInterval;
            const yPoint = chartHeight + TOP_PADDING - value / MAX_VALUE * chartHeight;
            ctx.fillText(value, YAXIS_PADDING - 3, yPoint)
        }


        //draw XAXIS
        ctx.lineTo(this.canvasWidth, chartHeight + TOP_PADDING)
        ctx.stroke();

        console.log(this.startTime % this.xTimeInterval);
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        let currentTime = this.startTime - this.startTime % this.xTimeInterval;
        while (currentTime < this.endTime + this.xTimeInterval) {
            const xPoint = (currentTime - this.startTime) / DURATION * this.chartWidth;
            console.log(xPoint);
            const date = new Date(currentTime);
            const text = date.getMinutes() + ":" + date.getSeconds();
            ctx.fillText(text, xPoint, chartHeight + TOP_PADDING + 4);
            currentTime += this.xTimeInterval;
        }
    }

    updateData = () => {

    }


}

document.addEventListener("DOMContentLoaded", (e) => {
    console.log(e)
    new LineChart("canvas");
})
