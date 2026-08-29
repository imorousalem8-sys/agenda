"use client";

import React, { useEffect, useRef } from "react";

export default function CyberGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const gridSize = 38;

    // Glowing energy pulse beams travelling on grid lines
    interface Pulse {
      axis: "x" | "y";
      fixedPos: number; // the line coordinate
      currentPos: number; // position along the line
      speed: number;
      length: number;
      color: string;
      glowSize: number;
    }

    const colors = [
      "rgba(56, 189, 248, ", // Cyan
      "rgba(99, 102, 241, ", // Indigo
      "rgba(168, 85, 247, ", // Purple
      "rgba(236, 72, 153, ", // Pink
    ];

    const pulses: Pulse[] = [];
    const maxPulses = 24;

    const createPulse = (): Pulse => {
      const isHorizontal = Math.random() > 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      if (isHorizontal) {
        const gridIndex = Math.floor(Math.random() * (height / gridSize));
        return {
          axis: "y",
          fixedPos: gridIndex * gridSize,
          currentPos: Math.random() * width,
          speed: (Math.random() * 1.6 + 0.9) * (Math.random() > 0.5 ? 1 : -1),
          length: Math.random() * 100 + 60,
          color,
          glowSize: Math.random() * 3.5 + 2,
        };
      } else {
        const gridIndex = Math.floor(Math.random() * (width / gridSize));
        return {
          axis: "x",
          fixedPos: gridIndex * gridSize,
          currentPos: Math.random() * height,
          speed: (Math.random() * 1.6 + 0.9) * (Math.random() > 0.5 ? 1 : -1),
          length: Math.random() * 100 + 60,
          color,
          glowSize: Math.random() * 3.5 + 2,
        };
      }
    };

    for (let i = 0; i < maxPulses; i++) {
      pulses.push(createPulse());
    }

    // Floating micro-nodes at intersections
    interface Node {
      x: number;
      y: number;
      alpha: number;
      targetAlpha: number;
      color: string;
    }
    const nodes: Node[] = [];
    const nodeCount = 40;
    for (let i = 0; i < nodeCount; i++) {
      const gx = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const gy = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      nodes.push({
        x: gx,
        y: gy,
        alpha: Math.random() * 0.8,
        targetAlpha: Math.random() * 0.9 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw crisp cyber grid lines
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.065)";

      ctx.beginPath();
      // Vertical lines
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, height);
      }
      // Horizontal lines
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(width, y + 0.5);
      }
      ctx.stroke();

      // Render glowing intersection nodes
      nodes.forEach((node) => {
        node.alpha += (node.targetAlpha - node.alpha) * 0.02;
        if (Math.abs(node.targetAlpha - node.alpha) < 0.05) {
          node.targetAlpha = Math.random() > 0.3 ? Math.random() * 0.85 : 0;
        }

        if (node.alpha > 0.02) {
          ctx.save();
          ctx.shadowColor = node.color + "0.9)";
          ctx.shadowBlur = 10;
          ctx.fillStyle = node.color + `${node.alpha})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });

      // Update and draw travelling luminous pulses
      pulses.forEach((p, idx) => {
        p.currentPos += p.speed * 60 * dt;

        // Wrap around boundaries
        if (p.axis === "y") {
          if (p.speed > 0 && p.currentPos - p.length > width) {
            pulses[idx] = createPulse();
            pulses[idx].currentPos = -pulses[idx].length;
          } else if (p.speed < 0 && p.currentPos + p.length < 0) {
            pulses[idx] = createPulse();
            pulses[idx].currentPos = width + pulses[idx].length;
          }
        } else {
          if (p.speed > 0 && p.currentPos - p.length > height) {
            pulses[idx] = createPulse();
            pulses[idx].currentPos = -pulses[idx].length;
          } else if (p.speed < 0 && p.currentPos + p.length < 0) {
            pulses[idx] = createPulse();
            pulses[idx].currentPos = height + pulses[idx].length;
          }
        }

        // Draw the laser pulse
        ctx.save();
        ctx.shadowColor = p.color + "0.9)";
        ctx.shadowBlur = 12;
        ctx.lineWidth = p.glowSize;

        const grad =
          p.axis === "y"
            ? ctx.createLinearGradient(
                p.currentPos - (p.speed > 0 ? p.length : -p.length),
                p.fixedPos,
                p.currentPos,
                p.fixedPos
              )
            : ctx.createLinearGradient(
                p.fixedPos,
                p.currentPos - (p.speed > 0 ? p.length : -p.length),
                p.fixedPos,
                p.currentPos
              );

        grad.addColorStop(0, p.color + "0)");
        grad.addColorStop(0.7, p.color + "0.7)");
        grad.addColorStop(1, p.color + "1)");

        ctx.strokeStyle = grad;
        ctx.beginPath();
        if (p.axis === "y") {
          ctx.moveTo(p.currentPos - (p.speed > 0 ? p.length : -p.length), p.fixedPos);
          ctx.lineTo(p.currentPos, p.fixedPos);
        } else {
          ctx.moveTo(p.fixedPos, p.currentPos - (p.speed > 0 ? p.length : -p.length));
          ctx.lineTo(p.fixedPos, p.currentPos);
        }
        ctx.stroke();

        // Tip glowing particle
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        if (p.axis === "y") {
          ctx.arc(p.currentPos, p.fixedPos, 2, 0, Math.PI * 2);
        } else {
          ctx.arc(p.fixedPos, p.currentPos, 2, 0, Math.PI * 2);
        }
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.9,
      }}
    />
  );
}
