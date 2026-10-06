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

    const gridSize = 44;

    // Monochrome & Emerald Developer Pulses
    interface Pulse {
      axis: "x" | "y";
      fixedPos: number;
      currentPos: number;
      speed: number;
      length: number;
      color: string;
      glowSize: number;
    }

    const devColors = [
      "rgba(255, 255, 255, ", // Pure white
      "rgba(148, 163, 184, ", // Slate / Steel
      "rgba(52, 211, 153, ",  // Emerald
      "rgba(56, 189, 248, ",  // Cyan tech
    ];

    const pulses: Pulse[] = [];
    const maxPulses = 18;

    const createPulse = (): Pulse => {
      const isHorizontal = Math.random() > 0.5;
      const color = devColors[Math.floor(Math.random() * devColors.length)];
      if (isHorizontal) {
        const gridIndex = Math.floor(Math.random() * (height / gridSize));
        return {
          axis: "y",
          fixedPos: gridIndex * gridSize,
          currentPos: Math.random() * width,
          speed: (Math.random() * 1.4 + 0.6) * (Math.random() > 0.5 ? 1 : -1),
          length: Math.random() * 80 + 40,
          color,
          glowSize: Math.random() * 2.5 + 1.5,
        };
      } else {
        const gridIndex = Math.floor(Math.random() * (width / gridSize));
        return {
          axis: "x",
          fixedPos: gridIndex * gridSize,
          currentPos: Math.random() * height,
          speed: (Math.random() * 1.4 + 0.6) * (Math.random() > 0.5 ? 1 : -1),
          length: Math.random() * 80 + 40,
          color,
          glowSize: Math.random() * 2.5 + 1.5,
        };
      }
    };

    for (let i = 0; i < maxPulses; i++) {
      pulses.push(createPulse());
    }

    // Micro grid points
    interface Node {
      x: number;
      y: number;
      alpha: number;
      targetAlpha: number;
      color: string;
    }
    const nodes: Node[] = [];
    const nodeCount = 32;
    for (let i = 0; i < nodeCount; i++) {
      const gx = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      const gy = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      nodes.push({
        x: gx,
        y: gy,
        alpha: Math.random() * 0.6,
        targetAlpha: Math.random() * 0.7 + 0.1,
        color: devColors[Math.floor(Math.random() * devColors.length)],
      });
    }

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      // Deep dark developer background
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      // Subtle Developer Matrix Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";

      ctx.beginPath();
      for (let x = 0; x <= width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y <= height; y += gridSize) {
        ctx.moveTo(y, y); // fixed
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Draw subtle grid intersection crosshairs
      ctx.fillStyle = "rgba(255, 255, 255, 0.08)";
      for (let x = gridSize; x < width; x += gridSize * 3) {
        for (let y = gridSize; y < height; y += gridSize * 3) {
          ctx.fillRect(x - 1, y - 1, 2, 2);
        }
      }

      // Draw pulses
      pulses.forEach((pulse, idx) => {
        pulse.currentPos += pulse.speed;

        if (pulse.axis === "y") {
          if (pulse.currentPos > width + pulse.length || pulse.currentPos < -pulse.length) {
            pulses[idx] = createPulse();
            return;
          }

          const grad = ctx.createLinearGradient(
            pulse.currentPos - (pulse.speed > 0 ? pulse.length : 0),
            pulse.fixedPos,
            pulse.currentPos + (pulse.speed < 0 ? pulse.length : 0),
            pulse.fixedPos
          );
          grad.addColorStop(0, "rgba(255, 255, 255, 0)");
          grad.addColorStop(0.7, pulse.color + "0.65)");
          grad.addColorStop(1, pulse.color + "0.95)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pulse.currentPos - (pulse.speed > 0 ? pulse.length : -pulse.length), pulse.fixedPos);
          ctx.lineTo(pulse.currentPos, pulse.fixedPos);
          ctx.stroke();

          // Head dot
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(pulse.currentPos, pulse.fixedPos, 1.5, 0, Math.PI * 2);
          ctx.fill();
        } else {
          if (pulse.currentPos > height + pulse.length || pulse.currentPos < -pulse.length) {
            pulses[idx] = createPulse();
            return;
          }

          const grad = ctx.createLinearGradient(
            pulse.fixedPos,
            pulse.currentPos - (pulse.speed > 0 ? pulse.length : 0),
            pulse.fixedPos,
            pulse.currentPos + (pulse.speed < 0 ? pulse.length : 0)
          );
          grad.addColorStop(0, "rgba(255, 255, 255, 0)");
          grad.addColorStop(0.7, pulse.color + "0.65)");
          grad.addColorStop(1, pulse.color + "0.95)");

          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(pulse.fixedPos, pulse.currentPos - (pulse.speed > 0 ? pulse.length : -pulse.length));
          ctx.lineTo(pulse.fixedPos, pulse.currentPos);
          ctx.stroke();

          // Head dot
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(pulse.fixedPos, pulse.currentPos, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Draw subtle intersection nodes
      nodes.forEach((node) => {
        node.alpha += (node.targetAlpha - node.alpha) * 0.03;
        if (Math.abs(node.targetAlpha - node.alpha) < 0.05) {
          node.targetAlpha = Math.random() > 0.4 ? Math.random() * 0.6 + 0.2 : 0;
        }

        if (node.alpha > 0.05) {
          ctx.fillStyle = node.color + `${node.alpha})`;
          ctx.beginPath();
          ctx.arc(node.x, node.y, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      // Subtle top/center white & steel ambient spotlight
      const radialGlow = ctx.createRadialGradient(
        width / 2,
        height * 0.15,
        0,
        width / 2,
        height * 0.15,
        width * 0.5
      );
      radialGlow.addColorStop(0, "rgba(255, 255, 255, 0.04)");
      radialGlow.addColorStop(0.5, "rgba(148, 163, 184, 0.015)");
      radialGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

      ctx.fillStyle = radialGlow;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

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
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        background: "#000000",
      }}
    />
  );
}
