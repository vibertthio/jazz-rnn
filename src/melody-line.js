import colors from './palette';
import size from 'element-size';


export default class MelodyLine {
  constructor(id) {
    this.id = id;
    this.melody = [];
    this.loading = true;
    this.currentPosition = 0;
    this.canvas = document.getElementById(this.id);

    this.hoveringNotes = true;
    this.hoveringSounds = false;
    this.waiting = false;
  }

  updateMelody(m) {
    this.loading = false;
    this.melody = m;
    // console.log(m);
  }

  draw(p = 0) {
    // resize
    this.canvas = document.getElementById(this.id);
    const psize = size(this.canvas);
    this.canvas.width = psize[0] | 0;
    this.canvas.height = psize[1] | 0;

    const borderRadius = 5;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const width = canvasWidth - borderRadius * 2;
    const height = canvasHeight - borderRadius * 2;
    const ctx = this.canvas.getContext('2d');
    const totalNotesLength = 220 * 4 * 8;
    const beat = p * totalNotesLength;


    ctx.save();

    // background
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.translate(borderRadius, borderRadius);
    this.drawAnchorPoints(ctx, width, height, width / 16);
    this.drawProgress(ctx,width, height, p);

    if (!this.loading && !this.hoveringNotes) {
      ctx.save();

      const step = width / totalNotesLength;
      const thickness = height / 64;

      for (let note of this.melody) {
        const { start, end, pitch, velocity } = note;
        // const { pitch, quantizedStartStep, quantizedEndStep } = note;
        const noteLength = end - start;

        ctx.save();

        ctx.translate(start * step, (64 - (pitch - 28)) * thickness);
        if (!this.waiting) {
          ctx.fillStyle = colors[3];
        } else {
          ctx.fillStyle = colors[5];
        }
        if (beat >= start && beat < end) {
          // ctx.fillStyle = colors[2];
          ctx.fillStyle = colors[6];
          ctx.translate(-noteLength * step * 0.1, -2.5);
          ctx.fillRect(0, 0, noteLength * step * 1.1, thickness * 2);
        } else {
          ctx.fillRect(0, 0, noteLength * step * 0.8, thickness);
        }

        ctx.restore();
      }

      ctx.restore();
    }
    ctx.restore();
  }

  drawAnchorPoints(ctx, w, h, unit) {
    ctx.save();
    const size = 2;
    const xSteps = w / unit;
    const ySteps = h / unit;
    for (let i = 0; i <= xSteps; i += 1) {
      for (let j = 0; j <= ySteps + 1; j += 1) {
        ctx.save();
        ctx.fillStyle = colors[5];
        ctx.translate(i * unit, j * unit);

        if (this.hoveringNotes) {
          ctx.fillStyle = colors[6];
          const scale = Math.sin(Date.now() * 0.002 - i * 0.1 + j * 0.1) * 3;
          // ctx.translate(-size * scale * 0.5, -size * scale * 0.5);
          ctx.beginPath();
          ctx.arc(0, 0, Math.abs(size * scale * 0.5), 0, Math.PI * 2);
          ctx.fill();
          // ctx.fillRect(0, 0, size * scale, size * scale);

        } else {
          ctx.fillRect(0, 0, size, size);
        }
        ctx.restore();
      }
    }
    ctx.restore();
  }

  drawProgress(ctx, w, h, p) {
    ctx.save();
    ctx.strokeStyle = colors[6];
    ctx.fillStyle = colors[6];

    ctx.translate(w * p, 0);
    ctx.beginPath();
    ctx.arc(0, 0, h * 0.03, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(0, h);
    ctx.stroke();

    ctx.translate(0, h);
    ctx.beginPath();
    ctx.arc(0, 0, h * 0.03, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

}
