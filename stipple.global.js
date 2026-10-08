"use strict";
var MaplibrePatternFills = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    CANONICAL_PATTERN_METADATA_KEY: () => CANONICAL_PATTERN_METADATA_KEY,
    PATTERN_METADATA_KEY: () => PATTERN_METADATA_KEY,
    PATTERN_SEQUENCE_VERSION: () => PATTERN_SEQUENCE_VERSION,
    PATTERN_SET_VERSION: () => PATTERN_SET_VERSION,
    PATTERN_VERSION: () => PATTERN_VERSION,
    addPatternFill: () => addPatternFill,
    buildStyleFragment: () => buildStyleFragment,
    composeTileImages: () => composeTileImages,
    createFontPatternDefinition: () => createFontPatternDefinition,
    createFontPatternTile: () => createFontPatternTile,
    createGeometricPatternTile: () => createGeometricPatternTile,
    createMiniContext: () => createMiniContext,
    createPatternSequenceExpression: () => createPatternSequenceExpression,
    createPatternSequenceStyleFragment: () => createPatternSequenceStyleFragment,
    createPatternSetExpression: () => createPatternSetExpression,
    createPatternSetStyleFragment: () => createPatternSetStyleFragment,
    createPatternStyleFragment: () => createPatternStyleFragment,
    createPatternTile: () => createPatternTile,
    createPlacementLayout: () => createPlacementLayout,
    createSvgPatternDefinition: () => createSvgPatternDefinition,
    createSvgScatterLayout: () => createSvgScatterLayout,
    createSvgScatterTile: () => createSvgScatterTile,
    hashStringToSeed: () => hashStringToSeed,
    importGeoJsonPolygons: () => importGeoJsonPolygons,
    installFontPatternFill: () => installFontPatternFill,
    installPatternFills: () => installPatternFills,
    installPatternTexture: () => installPatternTexture,
    installSvgIconScatter: () => installSvgIconScatter,
    installSvgPatternFill: () => installSvgPatternFill,
    interpolateSequenceValue: () => interpolateSequenceValue,
    makeTile: () => makeTile,
    materializePatternPlacement: () => materializePatternPlacement,
    materializePatternSequence: () => materializePatternSequence,
    mulberry32: () => mulberry32,
    observePatternFills: () => observePatternFills,
    parseCanonicalPatternMetadata: () => parseCanonicalPatternMetadata,
    parsePattern: () => parsePattern,
    parsePatternDefinition: () => parsePatternDefinition,
    parsePatternMetadata: () => parsePatternMetadata,
    parsePatternSequence: () => parsePatternSequence,
    parsePatternSet: () => parsePatternSet,
    patternDefinitionId: () => patternDefinitionId,
    patternForSetKey: () => patternForSetKey,
    patternFromLegacyDefinition: () => patternFromLegacyDefinition,
    patternImageId: () => patternImageId,
    patternToLegacyDefinition: () => patternToLegacyDefinition,
    scalePatternForZoom: () => scalePatternForZoom,
    scatterIconPoints: () => scatterIconPoints,
    scatterPointsInPolygon: () => scatterPointsInPolygon,
    screenPatternPhase: () => screenPatternPhase,
    sequenceProgress: () => sequenceProgress,
    serializePattern: () => serializePattern,
    serializePatternDefinition: () => serializePatternDefinition,
    serializePatternSequence: () => serializePatternSequence,
    serializePatternSet: () => serializePatternSet,
    syncPatternTexture: () => syncPatternTexture
  });

  // src/engine/miniContext.ts
  function parseColor(v) {
    const hex8 = v.match(/^#([0-9a-f]{8})$/i);
    if (hex8) {
      const n = parseInt(hex8[1], 16);
      return { r: n >>> 24 & 255, g: n >>> 16 & 255, b: n >>> 8 & 255, a: (n & 255) / 255 };
    }
    const hex6 = v.match(/^#([0-9a-f]{6})$/i);
    if (hex6) {
      const n = parseInt(hex6[1], 16);
      return { r: n >> 16 & 255, g: n >> 8 & 255, b: n & 255, a: 1 };
    }
    const hex4 = v.match(/^#([0-9a-f]{4})$/i);
    if (hex4) {
      const [r, g, b, a] = hex4[1].split("").map((c) => parseInt(c + c, 16));
      return { r, g, b, a: a / 255 };
    }
    const hex3 = v.match(/^#([0-9a-f]{3})$/i);
    if (hex3) {
      const [r, g, b] = hex3[1].split("").map((c) => parseInt(c + c, 16));
      return { r, g, b, a: 1 };
    }
    const rgbaComma = v.match(
      /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/i
    );
    const rgbaSpace = v.match(
      /^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/i
    );
    const rgba = rgbaComma ?? rgbaSpace;
    if (rgba) {
      const alphaToken = rgba[4];
      const a = alphaToken === void 0 ? 1 : alphaToken.endsWith("%") ? parseFloat(alphaToken) / 100 : +alphaToken;
      return { r: +rgba[1], g: +rgba[2], b: +rgba[3], a };
    }
    throw new TypeError(
      `Unsupported color "${v}" in the Node mini rasterizer. Supported: #rgb, #rgba, #rrggbb, #rrggbbaa, and rgb()/rgba() (comma or space/slash syntax). Named colors and hsl() require a real browser canvas.`
    );
  }
  var clamp01 = (v) => Math.max(0, Math.min(1, v));
  function createMiniContext(size) {
    const buf = new Uint8ClampedArray(size * size * 4);
    let strokeColor = { r: 0, g: 0, b: 0, a: 1 };
    let fillColor = { r: 0, g: 0, b: 0, a: 1 };
    let lineWidth = 1;
    let subpaths = [];
    let pendingArc = null;
    function setPixel(x, y, c) {
      if (x < 0 || y < 0 || x >= size || y >= size || c.a <= 0) return;
      const i = (y * size + x) * 4;
      if (c.a >= 1) {
        buf[i] = c.r;
        buf[i + 1] = c.g;
        buf[i + 2] = c.b;
        buf[i + 3] = 255;
        return;
      }
      const dstA = buf[i + 3] / 255;
      const outA = c.a + dstA * (1 - c.a);
      if (outA <= 0) return;
      buf[i] = (c.r * c.a + buf[i] * dstA * (1 - c.a)) / outA;
      buf[i + 1] = (c.g * c.a + buf[i + 1] * dstA * (1 - c.a)) / outA;
      buf[i + 2] = (c.b * c.a + buf[i + 2] * dstA * (1 - c.a)) / outA;
      buf[i + 3] = outA * 255;
    }
    function strokeSegment(x0, y0, x1, y1) {
      const half = lineWidth / 2;
      const minX = Math.max(0, Math.floor(Math.min(x0, x1) - half - 1));
      const maxX = Math.min(size - 1, Math.ceil(Math.max(x0, x1) + half + 1));
      const minY = Math.max(0, Math.floor(Math.min(y0, y1) - half - 1));
      const maxY = Math.min(size - 1, Math.ceil(Math.max(y0, y1) + half + 1));
      const dx = x1 - x0;
      const dy = y1 - y0;
      const lenSq = dx * dx + dy * dy;
      for (let py = minY; py <= maxY; py++) {
        for (let px = minX; px <= maxX; px++) {
          const cx = px + 0.5;
          const cy = py + 0.5;
          let t = lenSq === 0 ? 0 : ((cx - x0) * dx + (cy - y0) * dy) / lenSq;
          t = clamp01(t);
          const projX = x0 + t * dx;
          const projY = y0 + t * dy;
          const dist = Math.hypot(cx - projX, cy - projY);
          const coverage = clamp01(half + 0.5 - dist);
          if (coverage > 0) setPixel(px, py, { ...strokeColor, a: strokeColor.a * coverage });
        }
      }
    }
    function fillCircle(cx, cy, r) {
      const minX = Math.max(0, Math.floor(cx - r - 1));
      const maxX = Math.min(size - 1, Math.ceil(cx + r + 1));
      const minY = Math.max(0, Math.floor(cy - r - 1));
      const maxY = Math.min(size - 1, Math.ceil(cy + r + 1));
      for (let py = minY; py <= maxY; py++) {
        for (let px = minX; px <= maxX; px++) {
          const dist = Math.hypot(px + 0.5 - cx, py + 0.5 - cy);
          const coverage = clamp01(r + 0.5 - dist);
          if (coverage > 0) setPixel(px, py, { ...fillColor, a: fillColor.a * coverage });
        }
      }
    }
    const ctx = {
      get strokeStyle() {
        return `rgba(${strokeColor.r},${strokeColor.g},${strokeColor.b},${strokeColor.a})`;
      },
      set strokeStyle(v) {
        strokeColor = parseColor(v);
      },
      get fillStyle() {
        return `rgba(${fillColor.r},${fillColor.g},${fillColor.b},${fillColor.a})`;
      },
      set fillStyle(v) {
        fillColor = parseColor(v);
      },
      get lineWidth() {
        return lineWidth;
      },
      set lineWidth(v) {
        lineWidth = v;
      },
      lineCap: "round",
      clearRect() {
        buf.fill(0);
      },
      beginPath() {
        subpaths = [];
        pendingArc = null;
      },
      moveTo(x, y) {
        subpaths.push([{ x, y }]);
      },
      lineTo(x, y) {
        const current = subpaths[subpaths.length - 1];
        if (current) current.push({ x, y });
      },
      stroke() {
        for (const sp of subpaths) {
          for (let i = 1; i < sp.length; i++) strokeSegment(sp[i - 1].x, sp[i - 1].y, sp[i].x, sp[i].y);
        }
      },
      arc(x, y, radius) {
        pendingArc = { x, y, r: radius };
      },
      fill() {
        if (pendingArc) fillCircle(pendingArc.x, pendingArc.y, pendingArc.r);
      }
    };
    return {
      ctx,
      toTileImage: () => ({ width: size, height: size, data: new Uint8Array(buf.buffer) })
    };
  }

  // src/engine/seededRandom.ts
  function mulberry32(seed2) {
    let a = seed2 >>> 0;
    return function next() {
      a |= 0;
      a = a + 1831565813 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  function hashStringToSeed(str) {
    let h = 1779033703 ^ str.length;
    for (let i = 0; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = h << 13 | h >>> 19;
    }
    return (h ^ h >>> 16) >>> 0;
  }

  // src/engine/makeTile.ts
  var DEFAULT_STIPPLE_COUNT = 7;
  function toroidalDistance(a, b, period) {
    const dx = Math.min(Math.abs(a.x - b.x), period - Math.abs(a.x - b.x));
    const dy = Math.min(Math.abs(a.y - b.y), period - Math.abs(a.y - b.y));
    return Math.hypot(dx, dy);
  }
  function defaultContextFactory(size) {
    if (typeof document !== "undefined") {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const canvasCtx = canvas.getContext("2d");
      if (!canvasCtx) throw new Error("2D canvas context unavailable");
      return {
        ctx: canvasCtx,
        toTileImage: () => {
          const img = canvasCtx.getImageData(0, 0, size, size);
          return { width: size, height: size, data: new Uint8Array(img.data.buffer) };
        }
      };
    }
    return createMiniContext(size);
  }
  function makeTile(pattern, size, color, weight, angle, options = {}) {
    const pixelRatio2 = options.pixelRatio ?? 1;
    if (!Number.isFinite(pixelRatio2) || pixelRatio2 <= 0) {
      throw new RangeError("pixelRatio must be a finite number greater than 0");
    }
    if (!Number.isFinite(size) || size <= 0) {
      throw new RangeError("size must be a finite number greater than 0");
    }
    if (!Number.isFinite(weight) || weight <= 0) {
      throw new RangeError("weight must be a finite number greater than 0");
    }
    if (!Number.isFinite(angle)) {
      throw new TypeError("angle must be a finite number");
    }
    if (options.stippleCount !== void 0 && (!Number.isInteger(options.stippleCount) || options.stippleCount <= 0)) {
      throw new RangeError("stippleCount must be a positive integer");
    }
    if (typeof color !== "string" || color.trim().length === 0) {
      throw new TypeError("color must be a non-empty string");
    }
    const physicalSize = Math.max(1, Math.round(size * pixelRatio2));
    const renderScale = physicalSize / size;
    const { ctx, toTileImage } = (options.contextFactory ?? defaultContextFactory)(physicalSize);
    ctx.clearRect(0, 0, physicalSize, physicalSize);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.lineWidth = weight * renderScale;
    ctx.lineCap = "round";
    const appendStraightLines = (deg, step, includeEnd = true) => {
      const withinTile = (offset2) => includeEnd ? offset2 <= physicalSize : offset2 < physicalSize;
      if (deg === 0) {
        for (let y = 0; withinTile(y); y += step) {
          ctx.moveTo(0, y + 0.5 * renderScale);
          ctx.lineTo(physicalSize, y + 0.5 * renderScale);
        }
      } else if (deg === 90) {
        for (let x = 0; withinTile(x); x += step) {
          ctx.moveTo(x + 0.5 * renderScale, 0);
          ctx.lineTo(x + 0.5 * renderScale, physicalSize);
        }
      } else if (deg === 45) {
        for (let o = -physicalSize; o <= physicalSize * 2; o += step) {
          ctx.moveTo(o, 0);
          ctx.lineTo(o + physicalSize, physicalSize);
        }
      } else {
        for (let o = -physicalSize; o <= physicalSize * 2; o += step) {
          ctx.moveTo(o + physicalSize, 0);
          ctx.lineTo(o, physicalSize);
        }
      }
    };
    const drawLineComposition = (layers, singlePass = false) => {
      if (singlePass) {
        ctx.beginPath();
        for (const layer of layers) {
          appendStraightLines(layer.angle, layer.spacing, layer.includeEnd);
        }
        ctx.stroke();
        return;
      }
      for (const layer of layers) {
        ctx.beginPath();
        appendStraightLines(layer.angle, layer.spacing, layer.includeEnd);
        ctx.stroke();
      }
    };
    const hachureSpacing = Math.max(physicalSize / 2, 4 * renderScale);
    switch (pattern) {
      case "hachures":
        drawLineComposition([{ angle, spacing: hachureSpacing }]);
        break;
      case "cross":
        drawLineComposition([
          { angle, spacing: hachureSpacing },
          { angle: (angle + 90 + 45) % 180 - 45, spacing: hachureSpacing }
        ]);
        break;
      case "grid": {
        drawLineComposition([
          { angle: (angle + 90 + 45) % 180 - 45, spacing: physicalSize, includeEnd: false },
          { angle, spacing: physicalSize, includeEnd: false }
        ], true);
        break;
      }
      case "stipple": {
        const r = weight * renderScale * 0.6;
        const count = options.stippleCount ?? DEFAULT_STIPPLE_COUNT;
        const seedKey = `fixed:${count}`;
        const rand = mulberry32(hashStringToSeed(`stipple:${seedKey}`));
        const candidateCount = 20;
        const positions = [];
        for (let i = 0; i < count; i++) {
          let best = { x: rand() * physicalSize, y: rand() * physicalSize };
          let bestDistance = -1;
          for (let c = 0; c < candidateCount; c++) {
            const candidate = { x: rand() * physicalSize, y: rand() * physicalSize };
            const nearest = positions.length === 0 ? Infinity : Math.min(...positions.map((p) => toroidalDistance(candidate, p, physicalSize)));
            if (nearest > bestDistance) {
              best = candidate;
              bestDistance = nearest;
            }
          }
          positions.push(best);
        }
        for (const { x, y } of positions) {
          const minShiftX = Math.ceil((-r - x) / physicalSize);
          const maxShiftX = Math.floor((physicalSize + r - x) / physicalSize);
          const minShiftY = Math.ceil((-r - y) / physicalSize);
          const maxShiftY = Math.floor((physicalSize + r - y) / physicalSize);
          for (let shiftY = minShiftY; shiftY <= maxShiftY; shiftY++) {
            for (let shiftX = minShiftX; shiftX <= maxShiftX; shiftX++) {
              ctx.beginPath();
              ctx.arc(x + shiftX * physicalSize, y + shiftY * physicalSize, r, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
        break;
      }
      case "dots": {
        const r = Math.max(weight * renderScale * 0.5, renderScale);
        ctx.beginPath();
        ctx.arc(physicalSize / 2, physicalSize / 2, r, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "solid":
        break;
    }
    return toTileImage();
  }

  // src/engine/scatterPoints.ts
  function isInsideRings(x, y, rings) {
    let inside = false;
    for (const ring2 of rings) {
      for (let i = 0, j = ring2.length - 1; i < ring2.length; j = i++) {
        const [xi, yi] = ring2[i];
        const [xj, yj] = ring2[j];
        const crosses = yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi;
        if (crosses) inside = !inside;
      }
    }
    return inside;
  }
  function squaredDistanceToSegment(x, y, start, end) {
    const dx = end[0] - start[0];
    const dy = end[1] - start[1];
    if (dx === 0 && dy === 0) return (x - start[0]) ** 2 + (y - start[1]) ** 2;
    const projection = Math.max(
      0,
      Math.min(1, ((x - start[0]) * dx + (y - start[1]) * dy) / (dx * dx + dy * dy))
    );
    const nearestX = start[0] + projection * dx;
    const nearestY = start[1] + projection * dy;
    return (x - nearestX) ** 2 + (y - nearestY) ** 2;
  }
  function discFitsInside(x, y, radius, rings) {
    if (!isInsideRings(x, y, rings)) return false;
    const squaredRadius = radius * radius;
    for (const ring2 of rings) {
      for (let index = 0; index < ring2.length; index++) {
        const start = ring2[index];
        const end = ring2[(index + 1) % ring2.length];
        if (squaredDistanceToSegment(x, y, start, end) < squaredRadius) return false;
      }
    }
    return true;
  }
  function scatterPointsInPolygon(rings, options) {
    const {
      radius,
      density = 1,
      seed: seed2 = 1,
      rotationJitterDeg = 0,
      scaleJitter = 0,
      positionJitter = 0.15,
      stagger = true,
      distribution = stagger ? "offset" : "regular",
      minSpacing = 0,
      clipBounds
    } = options;
    if (!Number.isFinite(radius) || radius < 0) {
      throw new RangeError("radius must be a finite number greater than or equal to 0");
    }
    if (!Number.isFinite(density) || density <= 0) {
      throw new RangeError("density must be a finite number greater than 0");
    }
    if (!Number.isFinite(rotationJitterDeg) || rotationJitterDeg < 0) {
      throw new RangeError("rotationJitterDeg must be a finite number greater than or equal to 0");
    }
    if (!Number.isFinite(scaleJitter) || scaleJitter < 0 || scaleJitter >= 1) {
      throw new RangeError("scaleJitter must be a finite number greater than or equal to 0 and less than 1");
    }
    if (!Number.isFinite(positionJitter) || positionJitter < 0) {
      throw new RangeError("positionJitter must be a finite number greater than or equal to 0");
    }
    if (!["regular", "offset", "natural"].includes(distribution)) {
      throw new TypeError("distribution must be regular, offset, or natural");
    }
    if (!Number.isFinite(minSpacing) || minSpacing < 0) {
      throw new RangeError("minSpacing must be a finite number greater than or equal to 0");
    }
    const exterior = rings[0] ?? [];
    if (exterior.length === 0) return [];
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const [x, y] of exterior) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
    const seedNum = typeof seed2 === "string" ? hashStringToSeed(seed2) : seed2;
    const rand = mulberry32(seedNum);
    const cell = 100 / Math.sqrt(density);
    const points = [];
    const width = maxX - minX;
    const height = maxY - minY;
    const clipMinX = Math.max(minX, clipBounds?.minX ?? minX);
    const clipMinY = Math.max(minY, clipBounds?.minY ?? minY);
    const clipMaxX = Math.min(maxX, clipBounds?.maxX ?? maxX);
    const clipMaxY = Math.min(maxY, clipBounds?.maxY ?? maxY);
    if (clipMaxX <= clipMinX || clipMaxY <= clipMinY) return [];
    if (distribution === "natural") {
      const clippedWidth = clipMaxX - clipMinX;
      const clippedHeight = clipMaxY - clipMinY;
      const targetCount2 = Math.max(1, Math.round(density * clippedWidth * clippedHeight / 1e4));
      const minimumDistance = Math.max(
        cell * 0.76,
        radius * 2 * (1 + scaleJitter) + minSpacing
      );
      const conservativeRadius = radius * (1 + scaleJitter);
      const minimumDistanceSquared = minimumDistance ** 2;
      const gridCell = Math.max(minimumDistance / Math.SQRT2, 1);
      const grid = /* @__PURE__ */ new Map();
      const active = [];
      const gridCoordinate = (value, origin) => Math.floor((value - origin) / gridCell);
      const gridKey = (column, row) => `${column}:${row}`;
      const isFarEnough = (x, y) => {
        if (minimumDistanceSquared === 0) return true;
        const column = gridCoordinate(x, clipMinX);
        const row = gridCoordinate(y, clipMinY);
        for (let offsetY = -2; offsetY <= 2; offsetY++) {
          for (let offsetX = -2; offsetX <= 2; offsetX++) {
            const pointIndex = grid.get(gridKey(column + offsetX, row + offsetY));
            if (pointIndex === void 0) continue;
            const point = points[pointIndex];
            if ((x - point.x) ** 2 + (y - point.y) ** 2 < minimumDistanceSquared) return false;
          }
        }
        return true;
      };
      const addPoint = (x, y) => {
        const pointIndex = points.length;
        points.push({
          x,
          y,
          rotation: (rand() * 2 - 1) * rotationJitterDeg,
          scale: 1 + (rand() * 2 - 1) * scaleJitter
        });
        active.push(pointIndex);
        grid.set(gridKey(
          gridCoordinate(x, clipMinX),
          gridCoordinate(y, clipMinY)
        ), pointIndex);
      };
      for (let attempt = 0; attempt < 128 && points.length === 0; attempt++) {
        const x = clipMinX + rand() * clippedWidth;
        const y = clipMinY + rand() * clippedHeight;
        if (discFitsInside(x, y, conservativeRadius, rings)) addPoint(x, y);
      }
      while (active.length > 0 && points.length < targetCount2) {
        const activeSlot = Math.floor(rand() * active.length);
        const origin = points[active[activeSlot]];
        let accepted = false;
        for (let attempt = 0; attempt < 30; attempt++) {
          const angle = rand() * Math.PI * 2;
          const distance = minimumDistance * (1 + rand());
          const x = origin.x + Math.cos(angle) * distance;
          const y = origin.y + Math.sin(angle) * distance;
          if (x < clipMinX || x > clipMaxX || y < clipMinY || y > clipMaxY || !discFitsInside(x, y, conservativeRadius, rings) || !isFarEnough(x, y)) continue;
          addPoint(x, y);
          accepted = true;
          break;
        }
        if (!accepted) active.splice(activeSlot, 1);
      }
      return points;
    }
    const columns = Math.max(1, Math.floor(width / cell));
    const rows = Math.max(1, Math.floor(height / cell));
    const startX = minX + (width - (columns - 1) * cell) / 2;
    const startY = minY + (height - (rows - 1) * cell) / 2;
    const jitterMargin = cell * positionJitter / 2;
    const firstRow = Math.max(0, Math.ceil((clipMinY - jitterMargin - startY) / cell));
    const lastRow = Math.min(rows - 1, Math.floor((clipMaxY + jitterMargin - startY) / cell));
    for (let row = firstRow; row <= lastRow; row++) {
      const rowOffset = distribution === "offset" && columns > 1 ? row % 2 === 0 ? -cell / 4 : cell / 4 : 0;
      const firstColumn = Math.max(
        0,
        Math.ceil((clipMinX - jitterMargin - startX - rowOffset) / cell)
      );
      const lastColumn = Math.min(
        columns - 1,
        Math.floor((clipMaxX + jitterMargin - startX - rowOffset) / cell)
      );
      for (let column = firstColumn; column <= lastColumn; column++) {
        const jitter = distribution === "offset" ? positionJitter : 0;
        const jx = startX + column * cell + rowOffset + (rand() - 0.5) * cell * jitter;
        const jy = startY + row * cell + (rand() - 0.5) * cell * jitter;
        if (jx < clipMinX || jx > clipMaxX || jy < clipMinY || jy > clipMaxY) continue;
        const rotation = (rand() * 2 - 1) * rotationJitterDeg;
        const scale = 1 + (rand() * 2 - 1) * scaleJitter;
        if (discFitsInside(jx, jy, radius * scale, rings)) points.push({ x: jx, y: jy, rotation, scale });
      }
    }
    return points;
  }

  // src/engine/placementLayout.ts
  function positiveFinite(name, value) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(`${name} must be a finite number greater than 0`);
    }
  }
  function nonNegativeFinite(name, value) {
    if (!Number.isFinite(value) || value < 0) {
      throw new RangeError(`${name} must be a finite number greater than or equal to 0`);
    }
  }
  function fraction(name, value) {
    if (!Number.isFinite(value) || value < 0 || value >= 1) {
      throw new RangeError(`${name} must be at least 0 and less than 1`);
    }
  }
  function modulo(value, divisor) {
    return (value % divisor + divisor) % divisor;
  }
  function toroidalDistance2(first, second, tileSize) {
    const dx = Math.min(Math.abs(first.x - second.x), tileSize - Math.abs(first.x - second.x));
    const dy = Math.min(Math.abs(first.y - second.y), tileSize - Math.abs(first.y - second.y));
    return Math.hypot(dx, dy);
  }
  function targetCount(options) {
    if (options.spacing.mode === "count") return options.spacing.value;
    if (options.spacing.mode === "density") {
      return Math.max(1, Math.round(
        options.spacing.value * (options.tileSize * options.tileSize) / 1e4
      ));
    }
    const columns = Math.max(1, Math.round(options.tileSize / options.spacing.horizontal));
    const rows = Math.max(1, Math.round(options.tileSize / options.spacing.vertical));
    return columns * rows;
  }
  function createNaturalPositions(count, tileSize, minimumDistance, rand) {
    const positions = [];
    const candidateCount = 24;
    while (positions.length < count) {
      let best;
      let bestDistance = -1;
      for (let candidateIndex = 0; candidateIndex < candidateCount; candidateIndex++) {
        const candidate = { x: rand() * tileSize, y: rand() * tileSize };
        const nearest = positions.length === 0 ? Infinity : Math.min(...positions.map((position2) => toroidalDistance2(candidate, position2, tileSize)));
        if (nearest > bestDistance) {
          best = candidate;
          bestDistance = nearest;
        }
      }
      if (!best || positions.length > 0 && bestDistance < minimumDistance) break;
      positions.push(best);
    }
    return positions;
  }
  function createLatticePositions(options, count, rand) {
    if (options.spacing.mode === "count") {
      throw new TypeError("count spacing is only supported for natural placement");
    }
    let columns;
    let rows;
    if (options.spacing.mode === "density") {
      const targetCell = 100 / Math.sqrt(options.spacing.value);
      columns = Math.max(1, Math.round(options.tileSize / targetCell));
      rows = Math.max(1, Math.round(options.tileSize / targetCell));
      if (options.distribution === "offset" && rows % 2 !== 0) {
        const lower = Math.max(2, rows - 1);
        const upper = rows + 1;
        rows = Math.abs(columns * lower - count) <= Math.abs(columns * upper - count) ? lower : upper;
      }
    } else {
      columns = Math.max(1, Math.round(options.tileSize / options.spacing.horizontal));
      rows = Math.max(1, Math.round(options.tileSize / options.spacing.vertical));
    }
    const cellWidth = options.tileSize / columns;
    const cellHeight = options.tileSize / rows;
    const rowOffset = options.rowOffset ?? (options.distribution === "offset" ? 0.5 : 0);
    const columnOffset = options.columnOffset ?? 0;
    const jitterAmount = options.positionJitter;
    const angle = (options.gridAngle ?? 0) * Math.PI / 180;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const center = options.tileSize / 2;
    const positions = [];
    for (let row = 0; row < rows; row++) {
      const offsetX = row % 2 === 1 ? cellWidth * rowOffset : 0;
      for (let column = 0; column < columns; column++) {
        const offsetY = column % 2 === 1 ? cellHeight * columnOffset : 0;
        const unrotatedX = modulo(
          column * cellWidth + cellWidth / 2 + offsetX + (rand() - 0.5) * cellWidth * jitterAmount,
          options.tileSize
        );
        const unrotatedY = modulo(
          row * cellHeight + cellHeight / 2 + offsetY + (rand() - 0.5) * cellHeight * jitterAmount,
          options.tileSize
        );
        const dx = unrotatedX - center;
        const dy = unrotatedY - center;
        positions.push(angle === 0 ? { x: unrotatedX, y: unrotatedY } : {
          x: modulo(center + dx * cos - dy * sin, options.tileSize),
          y: modulo(center + dx * sin + dy * cos, options.tileSize)
        });
      }
    }
    return positions;
  }
  function createPlacementLayout(options) {
    const minSpacing = options.minSpacing ?? 0;
    const rowOffset = options.rowOffset ?? (options.distribution === "offset" ? 0.5 : 0);
    const columnOffset = options.columnOffset ?? 0;
    const gridAngle = options.gridAngle ?? 0;
    positiveFinite("tileSize", options.tileSize);
    positiveFinite("markSize", options.markSize);
    nonNegativeFinite("rotationJitterDeg", options.rotationJitterDeg);
    nonNegativeFinite("scaleJitter", options.scaleJitter);
    nonNegativeFinite("positionJitter", options.positionJitter);
    nonNegativeFinite("minSpacing", minSpacing);
    fraction("rowOffset", rowOffset);
    fraction("columnOffset", columnOffset);
    if (!Number.isFinite(gridAngle)) throw new TypeError("gridAngle must be a finite number");
    if (!["regular", "offset", "natural"].includes(options.distribution)) {
      throw new TypeError("distribution must be regular, offset, or natural");
    }
    if (options.scaleJitter >= 1) {
      throw new RangeError("scaleJitter must be less than 1 so every mark has a positive scale");
    }
    if (options.spacing.mode === "density") {
      positiveFinite("density", options.spacing.value);
    } else if (options.spacing.mode === "explicit") {
      positiveFinite("horizontalSpacing", options.spacing.horizontal);
      positiveFinite("verticalSpacing", options.spacing.vertical);
    } else {
      positiveFinite("count", options.spacing.value);
      if (!Number.isInteger(options.spacing.value)) {
        throw new RangeError("count must be a positive integer");
      }
    }
    const seedNumber = typeof options.seed === "string" ? hashStringToSeed(options.seed) : options.seed;
    if (!Number.isFinite(seedNumber)) {
      throw new RangeError("seed must be a finite number or a string");
    }
    const rand = mulberry32(seedNumber);
    const count = targetCount(options);
    const positions = options.distribution === "natural" ? createNaturalPositions(
      count,
      options.tileSize,
      options.markSize * Math.SQRT2 * (1 + options.scaleJitter) + minSpacing,
      rand
    ) : createLatticePositions(options, count, rand);
    const placements = [];
    positions.forEach(({ x, y }, markIndex) => {
      const rotationRad = (rand() * 2 - 1) * options.rotationJitterDeg * (Math.PI / 180);
      const scale = 1 + (rand() * 2 - 1) * options.scaleJitter;
      const extent = options.markSize * scale * Math.SQRT2 / 2;
      const minShiftX = Math.ceil((-extent - x) / options.tileSize);
      const maxShiftX = Math.floor((options.tileSize + extent - x) / options.tileSize);
      const minShiftY = Math.ceil((-extent - y) / options.tileSize);
      const maxShiftY = Math.floor((options.tileSize + extent - y) / options.tileSize);
      for (let shiftY = minShiftY; shiftY <= maxShiftY; shiftY++) {
        for (let shiftX = minShiftX; shiftX <= maxShiftX; shiftX++) {
          placements.push({
            markIndex,
            x: x + shiftX * options.tileSize,
            y: y + shiftY * options.tileSize,
            rotationRad,
            scale
          });
        }
      }
    });
    return placements;
  }

  // src/engine/svgScatterLayout.ts
  function createSvgScatterLayout(options) {
    const distribution = options.distribution ?? (options.stagger ? "offset" : "regular");
    return createPlacementLayout({
      tileSize: options.tileSize,
      markSize: options.stampSize,
      spacing: { mode: "density", value: options.density },
      seed: options.seed,
      rotationJitterDeg: options.rotationJitterDeg,
      scaleJitter: options.scaleJitter,
      // Legacy regular SVG layouts ignored position jitter.
      positionJitter: distribution === "regular" ? 0 : options.positionJitter,
      distribution,
      minSpacing: options.minSpacing
    }).map(({ markIndex, ...placement }) => ({
      stampIndex: markIndex,
      ...placement
    }));
  }

  // src/engine/composeTiles.ts
  function composeTileImages(layers) {
    if (layers.length === 0) {
      throw new RangeError("layers must contain at least one tile");
    }
    const { width, height } = layers[0].image;
    if (!Number.isInteger(width) || width <= 0 || !Number.isInteger(height) || height <= 0) {
      throw new RangeError("tile dimensions must be positive integers");
    }
    const length = width * height * 4;
    const output = new Uint8ClampedArray(length);
    for (const [index, layer] of layers.entries()) {
      const { image } = layer;
      const opacity2 = layer.opacity ?? 1;
      if (!Number.isFinite(opacity2) || opacity2 < 0 || opacity2 > 1) {
        throw new RangeError(`layers[${index}].opacity must be between 0 and 1`);
      }
      if (image.width !== width || image.height !== height || image.data.length !== length) {
        throw new RangeError("all tile layers must have equal dimensions and valid RGBA data");
      }
      for (let offset2 = 0; offset2 < length; offset2 += 4) {
        const sourceAlpha = image.data[offset2 + 3] / 255 * opacity2;
        if (sourceAlpha <= 0) continue;
        const destinationAlpha = output[offset2 + 3] / 255;
        const resultAlpha = sourceAlpha + destinationAlpha * (1 - sourceAlpha);
        output[offset2] = (image.data[offset2] * sourceAlpha + output[offset2] * destinationAlpha * (1 - sourceAlpha)) / resultAlpha;
        output[offset2 + 1] = (image.data[offset2 + 1] * sourceAlpha + output[offset2 + 1] * destinationAlpha * (1 - sourceAlpha)) / resultAlpha;
        output[offset2 + 2] = (image.data[offset2 + 2] * sourceAlpha + output[offset2 + 2] * destinationAlpha * (1 - sourceAlpha)) / resultAlpha;
        output[offset2 + 3] = resultAlpha * 255;
      }
    }
    return { width, height, data: new Uint8Array(output.buffer) };
  }

  // src/engine/patternScale.ts
  function finite(value, name) {
    if (!Number.isFinite(value)) throw new TypeError(`${name} must be finite`);
    return value;
  }
  function positive(value, name) {
    finite(value, name);
    if (value <= 0) throw new RangeError(`${name} must be greater than 0`);
    return value;
  }
  function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, value));
  }
  function scalePatternForZoom(options) {
    const zoom = finite(options.zoom, "zoom");
    const referenceZoom = finite(options.referenceZoom, "referenceZoom");
    const visualSize = positive(options.visualSize, "visualSize");
    const spacing = positive(options.spacing, "spacing");
    const opticalScale = positive(options.opticalScale ?? 1, "opticalScale");
    const minReadableSize = positive(
      options.minReadableSize ?? 10,
      "minReadableSize"
    );
    const maxVisualSize = positive(
      options.maxVisualSize ?? 72,
      "maxVisualSize"
    );
    const maxSpacingAtReadableFloorRatio = options.maxSpacingAtReadableFloorRatio === void 0 ? void 0 : positive(
      options.maxSpacingAtReadableFloorRatio,
      "maxSpacingAtReadableFloorRatio"
    );
    if (maxVisualSize < minReadableSize) {
      throw new RangeError("maxVisualSize must be greater than or equal to minReadableSize");
    }
    const rawScale = options.mode === "map" ? 2 ** (zoom - referenceZoom) : 1;
    const rawVisualSize = visualSize * rawScale;
    const minimumVisualSize = Math.min(visualSize, minReadableSize);
    const minimumScale = minimumVisualSize / visualSize;
    const maximumScale = maxVisualSize / visualSize;
    const scale = clamp(rawScale, minimumScale, maximumScale);
    const renderedVisualSize = visualSize * scale;
    let renderedSpacing = spacing * scale;
    if (maxSpacingAtReadableFloorRatio !== void 0 && rawScale <= minimumScale) {
      renderedSpacing = Math.min(
        renderedSpacing,
        renderedVisualSize * maxSpacingAtReadableFloorRatio
      );
    }
    return {
      scale,
      rawVisualSize,
      visualSize: renderedVisualSize,
      stampSize: renderedVisualSize / opticalScale,
      spacing: renderedSpacing,
      density: 1e4 / (renderedSpacing * renderedSpacing),
      opacity: 1,
      floored: rawScale < minimumScale,
      capped: rawScale > maximumScale
    };
  }

  // src/engine/screenPatternPhase.ts
  function screenPatternPhase(zoom, steps = 8) {
    if (!Number.isFinite(zoom)) {
      throw new TypeError("zoom must be a finite number");
    }
    if (!Number.isInteger(steps) || steps < 1) {
      throw new RangeError("steps must be a positive integer");
    }
    const fraction2 = zoom - Math.floor(zoom);
    const index = Math.min(steps, Math.round(fraction2 * steps));
    return {
      index,
      pixelRatioScale: 2 ** (index / steps)
    };
  }

  // src/engine/geojsonImport.ts
  function record(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
  function position(value, path) {
    if (!Array.isArray(value) || value.length < 2 || value.some((coordinate) => typeof coordinate !== "number" || !Number.isFinite(coordinate))) {
      throw new TypeError(`${path} must contain finite coordinate positions`);
    }
    const [longitude, latitude] = value;
    if (longitude < -180 || longitude > 180 || latitude < -90 || latitude > 90) {
      throw new RangeError(`${path} must use WGS84 longitude and latitude`);
    }
    return value.slice();
  }
  function samePosition(a, b) {
    return a.length === b.length && a.every((value, index) => value === b[index]);
  }
  function ring(value, path) {
    if (!Array.isArray(value) || value.length < 3) {
      throw new TypeError(`${path} must contain at least three positions`);
    }
    const positions = value.map((item, index) => position(item, `${path}[${index}]`));
    if (!samePosition(positions[0], positions[positions.length - 1])) {
      positions.push(positions[0].slice());
    }
    const unique = new Set(
      positions.slice(0, -1).map((item) => `${item[0]},${item[1]}`)
    );
    if (unique.size < 3) {
      throw new TypeError(`${path} must contain at least three distinct positions`);
    }
    return positions;
  }
  function polygonCoordinates(value, path) {
    if (!Array.isArray(value) || value.length === 0) {
      throw new TypeError(`${path} must contain at least one linear ring`);
    }
    return value.map((item, index) => ring(item, `${path}[${index}]`));
  }
  function properties(value) {
    return record(value) ? { ...value } : {};
  }
  function featureId(value) {
    return typeof value === "string" || typeof value === "number" ? value : void 0;
  }
  function importGeoJsonPolygons(input, maximumFeatures = 48) {
    if (!Number.isInteger(maximumFeatures) || maximumFeatures < 1) {
      throw new RangeError("maximumFeatures must be a positive integer");
    }
    const result = [];
    let ignoredFeatures = 0;
    function appendPolygon(coordinates, sourceProperties, id, path) {
      result.push({
        type: "Feature",
        ...featureId(id) === void 0 ? {} : { id: featureId(id) },
        properties: properties(sourceProperties),
        geometry: {
          type: "Polygon",
          coordinates: polygonCoordinates(coordinates, path)
        }
      });
      if (result.length > maximumFeatures) {
        throw new RangeError(
          `GeoJSON contains more than ${maximumFeatures} polygon parts`
        );
      }
    }
    function visitGeometry(geometry, sourceProperties, id, path) {
      if (!record(geometry) || typeof geometry.type !== "string") return false;
      if (geometry.type === "Polygon") {
        appendPolygon(geometry.coordinates, sourceProperties, id, `${path}.coordinates`);
        return true;
      }
      if (geometry.type === "MultiPolygon") {
        if (!Array.isArray(geometry.coordinates) || geometry.coordinates.length === 0) {
          throw new TypeError(`${path}.coordinates must contain polygons`);
        }
        geometry.coordinates.forEach((coordinates, index) => {
          appendPolygon(
            coordinates,
            sourceProperties,
            id,
            `${path}.coordinates[${index}]`
          );
        });
        return true;
      }
      if (geometry.type === "GeometryCollection") {
        if (!Array.isArray(geometry.geometries)) {
          throw new TypeError(`${path}.geometries must be an array`);
        }
        let found = false;
        geometry.geometries.forEach((item, index) => {
          found = visitGeometry(
            item,
            sourceProperties,
            id,
            `${path}.geometries[${index}]`
          ) || found;
        });
        return found;
      }
      return false;
    }
    function visit(value, path) {
      if (!record(value) || typeof value.type !== "string") {
        throw new TypeError(`${path} must be a GeoJSON object`);
      }
      if (value.type === "FeatureCollection") {
        if (!Array.isArray(value.features)) {
          throw new TypeError(`${path}.features must be an array`);
        }
        value.features.forEach((item, index) => {
          if (!record(item) || item.type !== "Feature") {
            throw new TypeError(`${path}.features[${index}] must be a Feature`);
          }
          const found = visitGeometry(
            item.geometry,
            item.properties,
            item.id,
            `${path}.features[${index}].geometry`
          );
          if (!found) ignoredFeatures++;
        });
        return;
      }
      if (value.type === "Feature") {
        const found = visitGeometry(
          value.geometry,
          value.properties,
          value.id,
          `${path}.geometry`
        );
        if (!found) ignoredFeatures++;
        return;
      }
      if (!visitGeometry(value, {}, void 0, path)) ignoredFeatures++;
    }
    visit(input, "GeoJSON");
    if (result.length === 0) {
      throw new TypeError("GeoJSON does not contain Polygon or MultiPolygon geometry");
    }
    return { features: result, ignoredFeatures };
  }

  // src/maplibre/patternDefinition.ts
  var PATTERN_METADATA_KEY = "maplibre-pattern-fills:v1";
  var geometricTypes = /* @__PURE__ */ new Set([
    "stipple",
    "hachures",
    "cross",
    "grid",
    "dots"
  ]);
  function isRecord(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
  function finiteNumber(record5, key) {
    const value = record5[key];
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(`${key} must be a finite number`);
    }
    return value;
  }
  function positiveNumber(record5, key) {
    const value = finiteNumber(record5, key);
    if (value <= 0) throw new RangeError(`${key} must be greater than 0`);
    return value;
  }
  function nonNegativeNumber(record5, key) {
    const value = finiteNumber(record5, key);
    if (value < 0) throw new RangeError(`${key} must be greater than or equal to 0`);
    return value;
  }
  function nonEmptyString(record5, key) {
    const value = record5[key];
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${key} must be a non-empty string`);
    }
    return value;
  }
  function parsePatternDefinition(value) {
    if (!isRecord(value)) throw new TypeError("pattern definition must be an object");
    if (value.kind === "geometric") {
      if (typeof value.pattern !== "string" || !geometricTypes.has(value.pattern)) {
        throw new TypeError("pattern must be a supported non-solid geometric pattern");
      }
      const definition = {
        kind: "geometric",
        pattern: value.pattern,
        size: positiveNumber(value, "size"),
        color: nonEmptyString(value, "color"),
        weight: positiveNumber(value, "weight"),
        angle: finiteNumber(value, "angle")
      };
      if (value.pixelRatio !== void 0) {
        definition.pixelRatio = positiveNumber(value, "pixelRatio");
      }
      if (value.stippleCount !== void 0) {
        const stippleCount = positiveNumber(value, "stippleCount");
        if (!Number.isInteger(stippleCount)) {
          throw new RangeError("stippleCount must be a positive integer");
        }
        definition.stippleCount = stippleCount;
      }
      return definition;
    }
    if (value.kind === "svg") {
      const scaleJitter = nonNegativeNumber(value, "scaleJitter");
      if (scaleJitter >= 1) throw new RangeError("scaleJitter must be less than 1");
      const seed2 = value.seed;
      if ((typeof seed2 !== "string" || seed2.length === 0) && (typeof seed2 !== "number" || !Number.isFinite(seed2))) {
        throw new TypeError("seed must be a finite number or a non-empty string");
      }
      if (typeof value.stagger !== "boolean") throw new TypeError("stagger must be a boolean");
      const distribution = value.distribution ?? (value.stagger ? "offset" : "regular");
      if (distribution !== "regular" && distribution !== "offset" && distribution !== "natural") {
        throw new TypeError("distribution must be regular, offset, or natural");
      }
      return {
        kind: "svg",
        svg: nonEmptyString(value, "svg"),
        tileSize: positiveNumber(value, "tileSize"),
        stampSize: positiveNumber(value, "stampSize"),
        density: positiveNumber(value, "density"),
        seed: seed2,
        rotationJitterDeg: nonNegativeNumber(value, "rotationJitterDeg"),
        scaleJitter,
        positionJitter: nonNegativeNumber(value, "positionJitter"),
        stagger: distribution === "offset",
        distribution,
        minSpacing: value.minSpacing === void 0 ? 0 : nonNegativeNumber(value, "minSpacing")
      };
    }
    if (value.kind === "font") {
      const fontStyle = value.fontStyle;
      if (fontStyle !== "normal" && fontStyle !== "italic") {
        throw new TypeError("fontStyle must be normal or italic");
      }
      if (typeof value.stagger !== "boolean") throw new TypeError("stagger must be a boolean");
      return {
        kind: "font",
        text: nonEmptyString(value, "text"),
        fontFamily: nonEmptyString(value, "fontFamily"),
        fontSize: positiveNumber(value, "fontSize"),
        fontWeight: nonEmptyString(value, "fontWeight"),
        fontStyle,
        letterSpacing: finiteNumber(value, "letterSpacing"),
        horizontalSpacing: nonNegativeNumber(value, "horizontalSpacing"),
        verticalSpacing: nonNegativeNumber(value, "verticalSpacing"),
        rotationDeg: finiteNumber(value, "rotationDeg"),
        stagger: value.stagger,
        color: nonEmptyString(value, "color")
      };
    }
    throw new TypeError('pattern definition kind must be "geometric", "svg", or "font"');
  }
  function parsePatternMetadata(value) {
    if (!isRecord(value)) throw new TypeError("pattern metadata must be an object");
    const metadata2 = {
      imageId: nonEmptyString(value, "imageId"),
      definition: parsePatternDefinition(value.definition)
    };
    if (value.variants !== void 0) {
      if (!Array.isArray(value.variants) || value.variants.length === 0) {
        throw new TypeError("variants must be a non-empty array");
      }
      metadata2.variants = value.variants.map((variant, index) => {
        if (!isRecord(variant)) {
          throw new TypeError(`variants[${index}] must be an object`);
        }
        return {
          zoom: finiteNumber(variant, "zoom"),
          imageId: nonEmptyString(variant, "imageId"),
          definition: parsePatternDefinition(variant.definition)
        };
      });
      for (let index = 1; index < metadata2.variants.length; index++) {
        if (metadata2.variants[index].zoom <= metadata2.variants[index - 1].zoom) {
          throw new RangeError("variant zoom levels must be strictly increasing");
        }
      }
    }
    return metadata2;
  }
  function serializePatternDefinition(definition) {
    return JSON.stringify(parsePatternDefinition(definition));
  }
  function patternDefinitionId(definition, prefix = "mpf") {
    const serialized = serializePatternDefinition(definition);
    let hash2 = 2166136261;
    for (let index = 0; index < serialized.length; index++) {
      hash2 ^= serialized.charCodeAt(index);
      hash2 = Math.imul(hash2, 16777619);
    }
    return `${prefix}_${(hash2 >>> 0).toString(16).padStart(8, "0")}`;
  }
  function createSvgPatternDefinition(options) {
    const distribution = options.distribution ?? (options.stagger === false ? "regular" : "offset");
    return parsePatternDefinition({
      kind: "svg",
      svg: options.svg,
      tileSize: options.tileSize ?? 288,
      stampSize: options.stampSize ?? 28,
      density: options.density ?? 1.4,
      seed: options.seed ?? 1,
      rotationJitterDeg: options.rotationJitterDeg ?? 0,
      scaleJitter: options.scaleJitter ?? 0,
      positionJitter: options.positionJitter ?? 0.15,
      stagger: distribution === "offset",
      distribution,
      minSpacing: options.minSpacing ?? 0
    });
  }
  function createFontPatternDefinition(options) {
    return parsePatternDefinition({
      kind: "font",
      text: options.text,
      fontFamily: options.fontFamily ?? "sans-serif",
      fontSize: options.fontSize ?? 18,
      fontWeight: options.fontWeight ?? "500",
      fontStyle: options.fontStyle ?? "normal",
      letterSpacing: options.letterSpacing ?? 0,
      horizontalSpacing: options.horizontalSpacing ?? 26,
      verticalSpacing: options.verticalSpacing ?? 22,
      rotationDeg: options.rotationDeg ?? 0,
      stagger: options.stagger ?? true,
      color: options.color ?? "#000000"
    });
  }

  // src/maplibre/syncPatternTexture.ts
  var installedPatterns = /* @__PURE__ */ new WeakMap();
  function resolvePixelRatio(value) {
    const displayRatio = typeof globalThis.devicePixelRatio === "number" ? globalThis.devicePixelRatio : 1;
    const ratio = value ?? Math.min(Math.max(displayRatio, 1), 2);
    if (!Number.isFinite(ratio) || ratio <= 0) {
      throw new RangeError("pixelRatio must be a finite number greater than 0");
    }
    return ratio;
  }
  function syncPatternTexture(map, options) {
    const { imageId, pattern, size, color, weight, angle, stippleCount } = options;
    if (pattern === "solid") return;
    const pixelRatio2 = resolvePixelRatio(options.pixelRatio);
    let byImage = installedPatterns.get(map);
    if (!byImage) {
      byImage = /* @__PURE__ */ new Map();
      installedPatterns.set(map, byImage);
    }
    const signature = JSON.stringify({ pattern, size, color, weight, angle, pixelRatio: pixelRatio2, stippleCount });
    const previous = byImage.get(imageId);
    if (map.hasImage(imageId) && previous?.signature === signature) return;
    const tile = makeTile(pattern, size, color, weight, angle, { pixelRatio: pixelRatio2, stippleCount });
    if (map.hasImage(imageId) && previous?.width === tile.width && previous.height === tile.height && previous.pixelRatio === pixelRatio2) {
      map.updateImage(imageId, tile);
    } else {
      if (map.hasImage(imageId)) map.removeImage(imageId);
      map.addImage(imageId, tile, { pixelRatio: pixelRatio2 });
    }
    byImage.set(imageId, {
      signature,
      width: tile.width,
      height: tile.height,
      pixelRatio: pixelRatio2
    });
    map.triggerRepaint();
  }

  // src/maplibre/buildStyleFragment.ts
  function buildStyleFragment(options) {
    const { source, sourceLayer, sourceUrl, bg, pattern, line } = options;
    const layers = [];
    if (bg?.enabled) {
      layers.push({
        id: `${source}__bg`,
        type: "fill",
        source,
        "source-layer": sourceLayer,
        paint: { "fill-color": bg.color, "fill-opacity": bg.opacity }
      });
    }
    if (pattern.pattern === "solid") {
      layers.push({
        id: `${source}__pat`,
        type: "fill",
        source,
        "source-layer": sourceLayer,
        paint: { "fill-color": pattern.color, "fill-opacity": pattern.opacity }
      });
    } else {
      const definition = {
        kind: "geometric",
        pattern: pattern.pattern,
        size: pattern.tile,
        color: pattern.color,
        weight: pattern.weight,
        angle: pattern.angle,
        ...pattern.pixelRatio === void 0 ? {} : { pixelRatio: pattern.pixelRatio },
        ...pattern.stippleCount === void 0 ? {} : { stippleCount: pattern.stippleCount }
      };
      const imageId = patternDefinitionId(definition);
      layers.push({
        id: `${source}__pat`,
        type: "fill",
        source,
        "source-layer": sourceLayer,
        paint: { "fill-pattern": imageId, "fill-opacity": pattern.opacity },
        metadata: {
          [PATTERN_METADATA_KEY]: { imageId, definition }
        }
      });
    }
    if (line?.enabled) {
      layers.push({
        id: `${source}__line`,
        type: "line",
        source,
        "source-layer": sourceLayer,
        paint: {
          "line-color": line.color,
          "line-width": line.width,
          ...line.dash.length ? { "line-dasharray": line.dash } : {}
        }
      });
    }
    return {
      sources: { [source]: { type: "vector", url: sourceUrl ?? `<url>/${source}` } },
      layers
    };
  }

  // src/maplibre/loadSvgImage.ts
  async function loadSvgImage(svg) {
    const blob = new Blob([svg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  // src/maplibre/svgPattern.ts
  function resolvePixelRatio2(value, useDisplayRatio) {
    const displayRatio = useDisplayRatio && typeof globalThis.devicePixelRatio === "number" ? globalThis.devicePixelRatio : 1;
    const ratio = value ?? Math.min(Math.max(displayRatio, 1), 2);
    if (!Number.isFinite(ratio) || ratio <= 0) {
      throw new RangeError("pixelRatio must be a finite number greater than 0");
    }
    return ratio;
  }
  async function createSvgScatterTile(options) {
    const definition = createSvgPatternDefinition(options);
    const pixelRatio2 = resolvePixelRatio2(options.pixelRatio, false);
    const {
      svg,
      tileSize,
      stampSize,
      density,
      seed: seed2,
      rotationJitterDeg,
      scaleJitter,
      positionJitter,
      distribution,
      minSpacing
    } = definition;
    const image = await loadSvgImage(svg);
    const canvas = document.createElement("canvas");
    const physicalTileSize = Math.max(1, Math.round(tileSize * pixelRatio2));
    const renderScale = physicalTileSize / tileSize;
    canvas.width = canvas.height = physicalTileSize;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas context unavailable");
    ctx.clearRect(0, 0, physicalTileSize, physicalTileSize);
    ctx.scale(renderScale, renderScale);
    const placements = createPlacementLayout({
      tileSize,
      markSize: stampSize,
      spacing: { mode: "density", value: density },
      seed: seed2,
      rotationJitterDeg,
      scaleJitter,
      // Preserve the legacy rule that regular SVG rows are exact.
      positionJitter: distribution === "regular" ? 0 : positionJitter,
      distribution,
      minSpacing
    });
    for (const placement of placements) {
      ctx.save();
      ctx.translate(placement.x, placement.y);
      ctx.rotate(placement.rotationRad);
      ctx.scale(placement.scale, placement.scale);
      ctx.drawImage(image, -stampSize / 2, -stampSize / 2, stampSize, stampSize);
      ctx.restore();
    }
    const imageData = ctx.getImageData(0, 0, physicalTileSize, physicalTileSize);
    return {
      width: physicalTileSize,
      height: physicalTileSize,
      data: new Uint8Array(imageData.data.buffer)
    };
  }
  var installedSvgPatterns = /* @__PURE__ */ new WeakMap();
  var svgPatternGenerations = /* @__PURE__ */ new WeakMap();
  async function installSvgPatternFill(map, options) {
    const definition = createSvgPatternDefinition(options);
    const pixelRatio2 = resolvePixelRatio2(options.pixelRatio, true);
    const signature = `${serializePatternDefinition(definition)}@${pixelRatio2}`;
    let installedById = installedSvgPatterns.get(map);
    if (!installedById) {
      installedById = /* @__PURE__ */ new Map();
      installedSvgPatterns.set(map, installedById);
    }
    if (map.hasImage(options.imageId) && installedById.get(options.imageId)?.signature === signature) {
      return;
    }
    let generationsById = svgPatternGenerations.get(map);
    if (!generationsById) {
      generationsById = /* @__PURE__ */ new Map();
      svgPatternGenerations.set(map, generationsById);
    }
    const generation = (generationsById.get(options.imageId) ?? 0) + 1;
    generationsById.set(options.imageId, generation);
    const tile = await createSvgScatterTile({ ...options, pixelRatio: pixelRatio2 });
    if (generationsById.get(options.imageId) !== generation) return;
    const previous = installedById.get(options.imageId);
    if (map.hasImage(options.imageId) && previous?.width === tile.width && previous.height === tile.height && previous.pixelRatio === pixelRatio2) {
      map.updateImage(options.imageId, tile);
    } else {
      if (map.hasImage(options.imageId)) map.removeImage(options.imageId);
      map.addImage(options.imageId, tile, { pixelRatio: pixelRatio2 });
    }
    installedById.set(options.imageId, {
      signature,
      width: tile.width,
      height: tile.height,
      pixelRatio: pixelRatio2
    });
    map.triggerRepaint();
  }

  // src/maplibre/fontPattern.ts
  function resolvePixelRatio3(value, useDisplayRatio) {
    const displayRatio = useDisplayRatio && typeof globalThis.devicePixelRatio === "number" ? globalThis.devicePixelRatio : 1;
    const ratio = value ?? Math.min(Math.max(displayRatio, 1), 2);
    if (!Number.isFinite(ratio) || ratio <= 0) {
      throw new RangeError("pixelRatio must be a finite number greater than 0");
    }
    return ratio;
  }
  function textWidth(ctx, characters, letterSpacing) {
    const glyphs = characters.reduce((total, character) => total + ctx.measureText(character).width, 0);
    return Math.max(1, glyphs + Math.max(0, characters.length - 1) * letterSpacing);
  }
  function fillSpacedText(ctx, characters, width, letterSpacing) {
    let x = -width / 2;
    for (const character of characters) {
      const characterWidth = ctx.measureText(character).width;
      ctx.fillText(character, x, 0);
      x += characterWidth + letterSpacing;
    }
  }
  async function createFontPatternTile(options) {
    const definition = createFontPatternDefinition(options);
    const pixelRatio2 = resolvePixelRatio3(options.pixelRatio, false);
    const {
      text,
      fontFamily,
      fontSize,
      fontWeight,
      fontStyle,
      letterSpacing,
      horizontalSpacing,
      verticalSpacing,
      rotationDeg,
      stagger,
      color
    } = definition;
    if (typeof document === "undefined") {
      throw new Error("Font pattern rasterization requires a browser canvas");
    }
    const font = `${fontStyle} ${fontWeight} ${fontSize}px ${fontFamily}`;
    if (document.fonts?.load) {
      await document.fonts.load(font, text.slice(0, 32)).catch(() => void 0);
    }
    const measureCanvas = document.createElement("canvas");
    const measureContext = measureCanvas.getContext("2d");
    if (!measureContext) throw new Error("2D canvas context unavailable");
    measureContext.font = font;
    const characters = Array.from(text);
    const measuredWidth = textWidth(measureContext, characters, letterSpacing);
    const metrics = measureContext.measureText(text);
    const measuredHeight = Math.max(
      fontSize,
      (metrics.actualBoundingBoxAscent || fontSize * 0.8) + (metrics.actualBoundingBoxDescent || fontSize * 0.2)
    );
    const radians = rotationDeg * Math.PI / 180;
    const rotatedWidth = Math.abs(measuredWidth * Math.cos(radians)) + Math.abs(measuredHeight * Math.sin(radians));
    const rotatedHeight = Math.abs(measuredWidth * Math.sin(radians)) + Math.abs(measuredHeight * Math.cos(radians));
    const cellWidth = Math.max(1, Math.ceil(rotatedWidth + horizontalSpacing));
    const rowHeight = Math.max(1, Math.ceil(rotatedHeight + verticalSpacing));
    const logicalWidth = cellWidth * (stagger ? 2 : 1);
    const logicalHeight = rowHeight * (stagger ? 2 : 1);
    const physicalWidth = Math.max(1, Math.round(logicalWidth * pixelRatio2));
    const physicalHeight = Math.max(1, Math.round(logicalHeight * pixelRatio2));
    const canvas = document.createElement("canvas");
    canvas.width = physicalWidth;
    canvas.height = physicalHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas context unavailable");
    ctx.clearRect(0, 0, physicalWidth, physicalHeight);
    ctx.scale(physicalWidth / logicalWidth, physicalHeight / logicalHeight);
    ctx.font = font;
    ctx.textAlign = "left";
    ctx.textBaseline = "middle";
    ctx.fillStyle = color;
    const rowCount = stagger ? 2 : 1;
    const columnCount = stagger ? 2 : 1;
    for (let row = -2; row <= rowCount + 1; row++) {
      const offset2 = stagger && Math.abs(row % 2) === 1 ? cellWidth / 2 : 0;
      for (let column = -2; column <= columnCount + 1; column++) {
        const x = column * cellWidth + cellWidth / 2 + offset2;
        const y = row * rowHeight + rowHeight / 2;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(radians);
        fillSpacedText(ctx, characters, measuredWidth, letterSpacing);
        ctx.restore();
      }
    }
    const imageData = ctx.getImageData(0, 0, physicalWidth, physicalHeight);
    return {
      width: physicalWidth,
      height: physicalHeight,
      data: new Uint8Array(imageData.data.buffer)
    };
  }
  var installedFontPatterns = /* @__PURE__ */ new WeakMap();
  var fontPatternGenerations = /* @__PURE__ */ new WeakMap();
  async function installFontPatternFill(map, options) {
    if (typeof options.imageId !== "string" || options.imageId.trim().length === 0) {
      throw new TypeError("imageId must be a non-empty string");
    }
    const definition = createFontPatternDefinition(options);
    const pixelRatio2 = resolvePixelRatio3(options.pixelRatio, true);
    const signature = `${serializePatternDefinition(definition)}@${pixelRatio2}`;
    let installedById = installedFontPatterns.get(map);
    if (!installedById) {
      installedById = /* @__PURE__ */ new Map();
      installedFontPatterns.set(map, installedById);
    }
    if (map.hasImage(options.imageId) && installedById.get(options.imageId)?.signature === signature) {
      return;
    }
    let generationsById = fontPatternGenerations.get(map);
    if (!generationsById) {
      generationsById = /* @__PURE__ */ new Map();
      fontPatternGenerations.set(map, generationsById);
    }
    const generation = (generationsById.get(options.imageId) ?? 0) + 1;
    generationsById.set(options.imageId, generation);
    const tile = await createFontPatternTile({ ...options, pixelRatio: pixelRatio2 });
    if (generationsById.get(options.imageId) !== generation) return;
    const previous = installedById.get(options.imageId);
    if (map.hasImage(options.imageId) && previous?.width === tile.width && previous.height === tile.height && previous.pixelRatio === pixelRatio2) {
      map.updateImage(options.imageId, tile);
    } else {
      if (map.hasImage(options.imageId)) map.removeImage(options.imageId);
      map.addImage(options.imageId, tile, { pixelRatio: pixelRatio2 });
    }
    installedById.set(options.imageId, {
      signature,
      width: tile.width,
      height: tile.height,
      pixelRatio: pixelRatio2
    });
    map.triggerRepaint();
  }

  // src/model/pattern.ts
  var PATTERN_VERSION = 1;
  function isRecord2(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }
  function record2(value, name) {
    if (!isRecord2(value)) throw new TypeError(`${name} must be an object`);
    return value;
  }
  function keys(value, allowed, name) {
    const allowedSet = new Set(allowed);
    const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
    if (unexpected) throw new TypeError(`${name}.${unexpected} is not supported`);
  }
  function finite2(value, name) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(`${name} must be a finite number`);
    }
    return value;
  }
  function positive2(value, name) {
    const parsed = finite2(value, name);
    if (parsed <= 0) throw new RangeError(`${name} must be greater than 0`);
    return parsed;
  }
  function nonNegative(value, name) {
    const parsed = finite2(value, name);
    if (parsed < 0) throw new RangeError(`${name} must be greater than or equal to 0`);
    return parsed;
  }
  function opacity(value, name) {
    const parsed = finite2(value, name);
    if (parsed < 0 || parsed > 1) throw new RangeError(`${name} must be between 0 and 1`);
    return parsed;
  }
  function offset(value, name) {
    const parsed = finite2(value, name);
    if (parsed < 0 || parsed >= 1) throw new RangeError(`${name} must be at least 0 and less than 1`);
    return parsed;
  }
  function nonEmptyString2(value, name) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${name} must be a non-empty string`);
    }
    return value;
  }
  function seed(value, name) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.length > 0) return value;
    throw new TypeError(`${name} must be a finite number or a non-empty string`);
  }
  function parseLatticeSpacing(value) {
    const input = record2(value, "fill.placement.spacing");
    if (input.mode === "explicit") {
      keys(input, ["mode", "horizontal", "vertical"], "fill.placement.spacing");
      return {
        mode: "explicit",
        horizontal: positive2(input.horizontal, "fill.placement.spacing.horizontal"),
        vertical: positive2(input.vertical, "fill.placement.spacing.vertical")
      };
    }
    if (input.mode === "density") {
      keys(input, ["mode", "value"], "fill.placement.spacing");
      return {
        mode: "density",
        value: positive2(input.value, "fill.placement.spacing.value")
      };
    }
    throw new TypeError('fill.placement.spacing.mode must be "explicit" or "density"');
  }
  function parsePlacement(value) {
    const input = record2(value, "fill.placement");
    if (input.kind === "lattice") {
      keys(input, [
        "kind",
        "tileSize",
        "spacing",
        "rowOffset",
        "columnOffset",
        "gridAngle",
        "positionJitter",
        "rotationJitter",
        "scaleJitter",
        "seed"
      ], "fill.placement");
      const scaleJitter = nonNegative(input.scaleJitter ?? 0, "fill.placement.scaleJitter");
      if (scaleJitter >= 1) throw new RangeError("fill.placement.scaleJitter must be less than 1");
      return {
        kind: "lattice",
        tileSize: positive2(input.tileSize, "fill.placement.tileSize"),
        spacing: parseLatticeSpacing(input.spacing),
        rowOffset: offset(input.rowOffset ?? 0, "fill.placement.rowOffset"),
        columnOffset: offset(input.columnOffset ?? 0, "fill.placement.columnOffset"),
        gridAngle: finite2(input.gridAngle ?? 0, "fill.placement.gridAngle"),
        positionJitter: nonNegative(input.positionJitter ?? 0, "fill.placement.positionJitter"),
        rotationJitter: nonNegative(input.rotationJitter ?? 0, "fill.placement.rotationJitter"),
        scaleJitter,
        seed: seed(input.seed ?? 1, "fill.placement.seed")
      };
    }
    if (input.kind === "natural") {
      keys(input, [
        "kind",
        "tileSize",
        "density",
        "count",
        "minSpacing",
        "positionJitter",
        "rotationJitter",
        "scaleJitter",
        "seed"
      ], "fill.placement");
      if (input.density === void 0 === (input.count === void 0)) {
        throw new TypeError("fill.placement must specify exactly one of density or count");
      }
      const scaleJitter = nonNegative(input.scaleJitter ?? 0, "fill.placement.scaleJitter");
      if (scaleJitter >= 1) throw new RangeError("fill.placement.scaleJitter must be less than 1");
      const parsed = {
        kind: "natural",
        tileSize: positive2(input.tileSize, "fill.placement.tileSize"),
        minSpacing: nonNegative(input.minSpacing ?? 0, "fill.placement.minSpacing"),
        positionJitter: nonNegative(input.positionJitter ?? 0, "fill.placement.positionJitter"),
        rotationJitter: nonNegative(input.rotationJitter ?? 0, "fill.placement.rotationJitter"),
        scaleJitter,
        seed: seed(input.seed ?? 1, "fill.placement.seed")
      };
      if (input.density !== void 0) {
        parsed.density = positive2(input.density, "fill.placement.density");
      } else {
        const count = positive2(input.count, "fill.placement.count");
        if (!Number.isInteger(count)) throw new RangeError("fill.placement.count must be a positive integer");
        parsed.count = count;
      }
      return parsed;
    }
    throw new TypeError('fill.placement.kind must be "lattice" or "natural"');
  }
  function parseGlyphFill(input) {
    keys(input, ["family", "glyph", "color", "size", "rotation", "opacity", "placement"], "fill");
    const glyphs = ["circle", "square", "diamond", "plus", "x", "triangle", "chevron"];
    if (typeof input.glyph !== "string" || !glyphs.includes(input.glyph)) {
      throw new TypeError("fill.glyph must be a supported glyph");
    }
    return {
      family: "glyph",
      glyph: input.glyph,
      color: nonEmptyString2(input.color, "fill.color"),
      size: positive2(input.size, "fill.size"),
      rotation: finite2(input.rotation ?? 0, "fill.rotation"),
      opacity: opacity(input.opacity ?? 1, "fill.opacity"),
      placement: parsePlacement(input.placement)
    };
  }
  function parseLineFill(input) {
    keys(input, [
      "family",
      "shape",
      "color",
      "angle",
      "spacing",
      "strokeWidth",
      "opacity",
      "dash",
      "oscillation"
    ], "fill");
    const shapes = ["straight", "dashed", "zigzag", "wave"];
    if (typeof input.shape !== "string" || !shapes.includes(input.shape)) {
      throw new TypeError("fill.shape must be a supported line shape");
    }
    const parsed = {
      family: "line",
      shape: input.shape,
      color: nonEmptyString2(input.color, "fill.color"),
      angle: finite2(input.angle, "fill.angle"),
      spacing: positive2(input.spacing, "fill.spacing"),
      strokeWidth: positive2(input.strokeWidth, "fill.strokeWidth"),
      opacity: opacity(input.opacity ?? 1, "fill.opacity")
    };
    if (input.dash !== void 0) {
      const dash = record2(input.dash, "fill.dash");
      keys(dash, ["length", "gap"], "fill.dash");
      parsed.dash = {
        length: positive2(dash.length, "fill.dash.length"),
        gap: positive2(dash.gap, "fill.dash.gap")
      };
    }
    if (input.oscillation !== void 0) {
      const oscillation = record2(input.oscillation, "fill.oscillation");
      keys(oscillation, ["amplitude", "wavelength"], "fill.oscillation");
      parsed.oscillation = {
        amplitude: positive2(oscillation.amplitude, "fill.oscillation.amplitude"),
        wavelength: positive2(oscillation.wavelength, "fill.oscillation.wavelength")
      };
    }
    if (parsed.shape === "dashed" && !parsed.dash) {
      throw new TypeError("fill.dash is required for dashed lines");
    }
    if ((parsed.shape === "zigzag" || parsed.shape === "wave") && !parsed.oscillation) {
      throw new TypeError(`fill.oscillation is required for ${parsed.shape} lines`);
    }
    return parsed;
  }
  function parseTextFill(input) {
    keys(input, [
      "family",
      "text",
      "color",
      "fontFamily",
      "fontSize",
      "fontWeight",
      "fontStyle",
      "letterSpacing",
      "rotation",
      "opacity",
      "placement"
    ], "fill");
    if (input.fontStyle !== "normal" && input.fontStyle !== "italic") {
      throw new TypeError("fill.fontStyle must be normal or italic");
    }
    const placement = record2(input.placement, "fill.placement");
    keys(placement, ["kind", "horizontalSpacing", "verticalSpacing", "rowOffset"], "fill.placement");
    if (placement.kind !== "text-lattice") {
      throw new TypeError('fill.placement.kind must be "text-lattice" for text fills');
    }
    return {
      family: "text",
      text: nonEmptyString2(input.text, "fill.text"),
      color: nonEmptyString2(input.color, "fill.color"),
      fontFamily: nonEmptyString2(input.fontFamily, "fill.fontFamily"),
      fontSize: positive2(input.fontSize, "fill.fontSize"),
      fontWeight: nonEmptyString2(input.fontWeight, "fill.fontWeight"),
      fontStyle: input.fontStyle,
      letterSpacing: finite2(input.letterSpacing, "fill.letterSpacing"),
      rotation: finite2(input.rotation ?? 0, "fill.rotation"),
      opacity: opacity(input.opacity ?? 1, "fill.opacity"),
      placement: {
        kind: "text-lattice",
        horizontalSpacing: nonNegative(placement.horizontalSpacing, "fill.placement.horizontalSpacing"),
        verticalSpacing: nonNegative(placement.verticalSpacing, "fill.placement.verticalSpacing"),
        rowOffset: offset(placement.rowOffset ?? 0, "fill.placement.rowOffset")
      }
    };
  }
  function parseSvgFill(input) {
    keys(input, ["family", "svg", "size", "rotation", "opacity", "placement"], "fill");
    return {
      family: "svg",
      svg: nonEmptyString2(input.svg, "fill.svg"),
      size: positive2(input.size, "fill.size"),
      rotation: finite2(input.rotation ?? 0, "fill.rotation"),
      opacity: opacity(input.opacity ?? 1, "fill.opacity"),
      placement: parsePlacement(input.placement)
    };
  }
  function parsePrimitiveFill(value) {
    const input = record2(value, "fill");
    if (input.family === "glyph") return parseGlyphFill(input);
    if (input.family === "line") return parseLineFill(input);
    if (input.family === "text") return parseTextFill(input);
    if (input.family === "svg") return parseSvgFill(input);
    throw new TypeError("composite fill layers must be glyph, line, text, or svg fills");
  }
  function parseFill(value) {
    const input = record2(value, "fill");
    if (input.family === "solid") {
      keys(input, ["family", "color"], "fill");
      return { family: "solid", color: nonEmptyString2(input.color, "fill.color") };
    }
    if (input.family === "composite") {
      keys(input, ["family", "composition", "layers"], "fill");
      if (!Array.isArray(input.layers) || input.layers.length === 0) {
        throw new TypeError("fill.layers must be a non-empty array");
      }
      const composition = input.composition ?? "custom";
      if (composition !== "custom" && composition !== "crosshatch" && composition !== "grid") {
        throw new TypeError("fill.composition must be custom, crosshatch, or grid");
      }
      return {
        family: "composite",
        composition,
        layers: input.layers.map(parsePrimitiveFill)
      };
    }
    return parsePrimitiveFill(input);
  }
  function parseScale(value) {
    const input = record2(value, "scale");
    if (input.mode === "screen") {
      keys(input, ["mode"], "scale");
      return { mode: "screen" };
    }
    if (input.mode === "map") {
      keys(input, ["mode", "referenceZoom"], "scale");
      return { mode: "map", referenceZoom: finite2(input.referenceZoom, "scale.referenceZoom") };
    }
    throw new TypeError('scale.mode must be "screen" or "map"');
  }
  function parsePattern(value) {
    const input = record2(value, "pattern");
    keys(input, [
      "version",
      "kind",
      "id",
      "name",
      "fill",
      "opacity",
      "background",
      "outline",
      "scale",
      "render"
    ], "pattern");
    if (input.version !== PATTERN_VERSION) {
      throw new TypeError(`pattern.version must be ${PATTERN_VERSION}`);
    }
    if (input.kind !== "pattern") throw new TypeError('pattern.kind must be "pattern"');
    const parsed = {
      version: PATTERN_VERSION,
      kind: "pattern",
      id: nonEmptyString2(input.id, "pattern.id"),
      ...input.name === void 0 ? {} : { name: nonEmptyString2(input.name, "pattern.name") },
      fill: parseFill(input.fill),
      opacity: opacity(input.opacity ?? 1, "pattern.opacity"),
      scale: input.scale === void 0 ? { mode: "screen" } : parseScale(input.scale),
      render: { pixelRatio: "auto" }
    };
    if (input.background !== void 0) {
      const background = record2(input.background, "pattern.background");
      keys(background, ["color", "opacity"], "pattern.background");
      parsed.background = {
        color: nonEmptyString2(background.color, "pattern.background.color"),
        opacity: opacity(background.opacity, "pattern.background.opacity")
      };
    }
    if (input.outline !== void 0) {
      const outline = record2(input.outline, "pattern.outline");
      keys(outline, ["color", "width", "dash"], "pattern.outline");
      if (outline.dash !== void 0 && !Array.isArray(outline.dash)) {
        throw new TypeError("pattern.outline.dash must be an array");
      }
      parsed.outline = {
        color: nonEmptyString2(outline.color, "pattern.outline.color"),
        width: positive2(outline.width, "pattern.outline.width"),
        dash: (outline.dash ?? []).map((entry, index) => nonNegative(entry, `pattern.outline.dash[${index}]`))
      };
    }
    if (input.render !== void 0) {
      const render = record2(input.render, "pattern.render");
      keys(render, ["pixelRatio"], "pattern.render");
      parsed.render = {
        pixelRatio: render.pixelRatio === "auto" ? "auto" : positive2(render.pixelRatio, "pattern.render.pixelRatio")
      };
    }
    return parsed;
  }
  function serializePattern(pattern) {
    return JSON.stringify(parsePattern(pattern));
  }

  // src/model/patternSet.ts
  var PATTERN_SET_VERSION = 1;
  function record3(value, name) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError(`${name} must be an object`);
    }
    return value;
  }
  function keys2(value, allowed, name) {
    const allowedSet = new Set(allowed);
    const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
    if (unexpected) throw new TypeError(`${name}.${unexpected} is not supported`);
  }
  function nonEmptyString3(value, name) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${name} must be a non-empty string`);
    }
    return value;
  }
  function parseKey(value, name) {
    if (typeof value === "string" && value.length > 0) return value;
    if (typeof value === "number" && Number.isFinite(value)) return value;
    throw new TypeError(`${name} must be a non-empty string or a finite number`);
  }
  function keyIdentity(value) {
    return `${typeof value}:${value}`;
  }
  function parsePatternSet(value) {
    const input = record3(value, "patternSet");
    keys2(input, ["version", "kind", "id", "name", "entries"], "patternSet");
    if (input.version !== PATTERN_SET_VERSION) {
      throw new TypeError(`patternSet.version must be ${PATTERN_SET_VERSION}`);
    }
    if (input.kind !== "pattern-set") {
      throw new TypeError('patternSet.kind must be "pattern-set"');
    }
    if (!Array.isArray(input.entries) || input.entries.length === 0) {
      throw new TypeError("patternSet.entries must be a non-empty array");
    }
    const identities = /* @__PURE__ */ new Set();
    const entries = input.entries.map((value2, index) => {
      const entry = record3(value2, `patternSet.entries[${index}]`);
      keys2(entry, ["key", "label", "pattern"], `patternSet.entries[${index}]`);
      const key = parseKey(entry.key, `patternSet.entries[${index}].key`);
      const identity = keyIdentity(key);
      if (identities.has(identity)) {
        throw new Error(`patternSet.entries contains duplicate key ${JSON.stringify(key)}`);
      }
      identities.add(identity);
      return {
        key,
        ...entry.label === void 0 ? {} : { label: nonEmptyString3(entry.label, `patternSet.entries[${index}].label`) },
        pattern: parsePattern(entry.pattern)
      };
    });
    return {
      version: PATTERN_SET_VERSION,
      kind: "pattern-set",
      id: nonEmptyString3(input.id, "patternSet.id"),
      ...input.name === void 0 ? {} : { name: nonEmptyString3(input.name, "patternSet.name") },
      entries
    };
  }
  function serializePatternSet(patternSet) {
    return JSON.stringify(parsePatternSet(patternSet));
  }
  function patternForSetKey(value, key) {
    const patternSet = parsePatternSet(value);
    return patternSet.entries.find((entry) => entry.key === key)?.pattern;
  }

  // src/model/patternSequence.ts
  var PATTERN_SEQUENCE_VERSION = 1;
  function record4(value, name) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError(`${name} must be an object`);
    }
    return value;
  }
  function keys3(value, allowed, name) {
    const allowedSet = new Set(allowed);
    const unexpected = Object.keys(value).find((key) => !allowedSet.has(key));
    if (unexpected) throw new TypeError(`${name}.${unexpected} is not supported`);
  }
  function nonEmptyString4(value, name) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${name} must be a non-empty string`);
    }
    return value;
  }
  function finite3(value, name) {
    if (typeof value !== "number" || !Number.isFinite(value)) {
      throw new TypeError(`${name} must be a finite number`);
    }
    return value;
  }
  function integer(value, name) {
    const parsed = finite3(value, name);
    if (!Number.isInteger(parsed)) throw new RangeError(`${name} must be an integer`);
    return parsed;
  }
  function clonePattern(pattern) {
    return JSON.parse(JSON.stringify(pattern));
  }
  function applySpacing(fill, value) {
    if (fill.family === "line") {
      fill.spacing = value;
      return true;
    }
    if (fill.family === "text") {
      fill.placement.horizontalSpacing = value;
      fill.placement.verticalSpacing = value;
      return true;
    }
    if (fill.family === "glyph" || fill.family === "svg") {
      const placement = fill.placement;
      if (placement.kind === "natural") {
        placement.density = 1e4 / (value * value);
        delete placement.count;
      } else {
        placement.spacing = { mode: "explicit", horizontal: value, vertical: value };
      }
      return true;
    }
    return false;
  }
  function applySize(fill, value) {
    if (fill.family === "glyph" || fill.family === "svg") {
      fill.size = value;
      return true;
    }
    if (fill.family === "text") {
      fill.fontSize = value;
      return true;
    }
    return false;
  }
  function applyStrokeWidth(fill, value) {
    if (fill.family !== "line") return false;
    fill.strokeWidth = value;
    return true;
  }
  function applyToFill(fill, parameter, value) {
    if (fill.family === "solid") return false;
    const apply = parameter === "spacing" ? applySpacing : parameter === "size" ? applySize : applyStrokeWidth;
    if (fill.family !== "composite") return apply(fill, value);
    let changed = false;
    for (const layer of fill.layers) changed = apply(layer, value) || changed;
    return changed;
  }
  function derivePattern(sequence, index, value) {
    const pattern = clonePattern(sequence.base);
    pattern.id = `${sequence.base.id}-step-${index + 1}`;
    pattern.name = `${sequence.base.name ?? sequence.base.id} ${index + 1}`;
    if (sequence.variation.parameter === "opacity") {
      pattern.opacity = value;
    } else if (!applyToFill(pattern.fill, sequence.variation.parameter, value)) {
      throw new TypeError(
        `${sequence.variation.parameter} cannot vary for ${pattern.fill.family} fills`
      );
    }
    return parsePattern(pattern);
  }
  function materializeNormalized(sequence) {
    const overrideValues = new Map(sequence.overrides.map(({ step, value }) => [step, value]));
    const materialized = Array.from({ length: sequence.steps }, (_, index) => {
      const progress = sequenceProgress(index, sequence.steps, sequence.variation.progression);
      const interpolated = interpolateSequenceValue(
        sequence.variation.start,
        sequence.variation.end,
        progress,
        sequence.variation.progression
      );
      const value = overrideValues.get(index) ?? interpolated;
      return { index, value, pattern: derivePattern(sequence, index, value) };
    });
    if (sequence.variation.visualOrder) {
      const visualWeights = materialized.map(({ value }) => sequence.variation.parameter === "spacing" ? -value : value);
      const direction = sequence.variation.visualOrder === "low-to-high" ? 1 : -1;
      if (visualWeights.some((weight, index) => index > 0 && (weight - visualWeights[index - 1]) * direction < 0)) {
        throw new RangeError("patternSequence overrides must preserve variation.visualOrder");
      }
    }
    return materialized;
  }
  function sequenceProgress(index, steps, progression = "linear") {
    if (progression !== "linear" && progression !== "geometric") {
      throw new TypeError(`Unsupported sequence progression: ${progression}`);
    }
    return index / (steps - 1);
  }
  function interpolateSequenceValue(start, end, progress, progression = "linear") {
    if (progression === "linear") return start + (end - start) * progress;
    if (progression !== "geometric") {
      throw new TypeError(`Unsupported sequence progression: ${progression}`);
    }
    if (start <= 0 || end <= 0) {
      throw new RangeError("geometric sequence progression requires positive endpoints");
    }
    return start * (end / start) ** progress;
  }
  function validateVisualOrder(variation) {
    if (!variation.visualOrder || variation.start === variation.end) return;
    const numericIncrease = variation.end > variation.start;
    const weightIncrease = variation.parameter === "spacing" ? !numericIncrease : numericIncrease;
    const expectedIncrease = variation.visualOrder === "low-to-high";
    if (weightIncrease !== expectedIncrease) {
      const direction = variation.parameter === "spacing" ? "decrease" : "increase";
      throw new RangeError(
        `patternSequence.variation ${variation.visualOrder} requires ${variation.parameter} to ${direction}`
      );
    }
  }
  function parsePatternSequence(value) {
    const input = record4(value, "patternSequence");
    keys3(
      input,
      ["version", "kind", "id", "name", "base", "steps", "variation", "overrides"],
      "patternSequence"
    );
    if (input.version !== PATTERN_SEQUENCE_VERSION) {
      throw new TypeError(`patternSequence.version must be ${PATTERN_SEQUENCE_VERSION}`);
    }
    if (input.kind !== "pattern-sequence") {
      throw new TypeError('patternSequence.kind must be "pattern-sequence"');
    }
    const steps = integer(input.steps, "patternSequence.steps");
    if (steps < 2 || steps > 256) {
      throw new RangeError("patternSequence.steps must be between 2 and 256");
    }
    const variation = record4(input.variation, "patternSequence.variation");
    keys3(
      variation,
      ["parameter", "start", "end", "progression", "visualOrder"],
      "patternSequence.variation"
    );
    if (!["spacing", "size", "strokeWidth", "opacity"].includes(String(variation.parameter))) {
      throw new TypeError("patternSequence.variation.parameter is not supported");
    }
    if (variation.progression !== void 0 && variation.progression !== "linear" && variation.progression !== "geometric") {
      throw new TypeError("patternSequence.variation.progression is not supported");
    }
    if (variation.visualOrder !== void 0 && variation.visualOrder !== "low-to-high" && variation.visualOrder !== "high-to-low") {
      throw new TypeError("patternSequence.variation.visualOrder is not supported");
    }
    if (input.overrides !== void 0 && !Array.isArray(input.overrides)) {
      throw new TypeError("patternSequence.overrides must be an array");
    }
    const seenSteps = /* @__PURE__ */ new Set();
    const overrides = (input.overrides ?? []).map((value2, index) => {
      const override = record4(value2, `patternSequence.overrides[${index}]`);
      keys3(override, ["step", "value"], `patternSequence.overrides[${index}]`);
      const step = integer(override.step, `patternSequence.overrides[${index}].step`);
      if (step < 0 || step >= steps) {
        throw new RangeError(`patternSequence.overrides[${index}].step is out of range`);
      }
      if (seenSteps.has(step)) throw new Error(`patternSequence overrides step ${step} more than once`);
      seenSteps.add(step);
      return { step, value: finite3(override.value, `patternSequence.overrides[${index}].value`) };
    }).sort((first, second) => first.step - second.step);
    const sequence = {
      version: PATTERN_SEQUENCE_VERSION,
      kind: "pattern-sequence",
      id: nonEmptyString4(input.id, "patternSequence.id"),
      ...input.name === void 0 ? {} : { name: nonEmptyString4(input.name, "patternSequence.name") },
      base: parsePattern(input.base),
      steps,
      variation: {
        parameter: variation.parameter,
        start: finite3(variation.start, "patternSequence.variation.start"),
        end: finite3(variation.end, "patternSequence.variation.end"),
        ...variation.progression === void 0 ? {} : { progression: variation.progression },
        ...variation.visualOrder === void 0 ? {} : { visualOrder: variation.visualOrder }
      },
      overrides
    };
    if (sequence.variation.progression === "geometric" && (sequence.variation.start <= 0 || sequence.variation.end <= 0)) {
      throw new RangeError("geometric sequence progression requires positive endpoints");
    }
    validateVisualOrder(sequence.variation);
    materializeNormalized(sequence);
    return sequence;
  }
  function materializePatternSequence(value) {
    return materializeNormalized(parsePatternSequence(value));
  }
  function serializePatternSequence(value) {
    return JSON.stringify(parsePatternSequence(value));
  }

  // src/maplibre/patternStyle.ts
  var CANONICAL_PATTERN_METADATA_KEY = "stipple:patterns:v1";
  function nonEmptyString5(value, name) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${name} must be a non-empty string`);
    }
    return value;
  }
  function hash(value) {
    let result = 2166136261;
    for (let index = 0; index < value.length; index++) {
      result ^= value.charCodeAt(index);
      result = Math.imul(result, 16777619);
    }
    return (result >>> 0).toString(16).padStart(8, "0");
  }
  function patternImageId(value, prefix = "stipple") {
    const normalizedPrefix = nonEmptyString5(prefix, "prefix").replace(/[^a-z0-9_-]+/gi, "-").replace(/^-+|-+$/g, "") || "stipple";
    return `${normalizedPrefix}_${hash(serializePattern(value))}`;
  }
  function scalePlacement(placement, factor) {
    if (placement.kind === "natural") {
      return {
        ...placement,
        tileSize: placement.tileSize * factor,
        minSpacing: placement.minSpacing * factor,
        ...placement.density === void 0 ? {} : { density: placement.density / (factor * factor) }
      };
    }
    return {
      ...placement,
      tileSize: placement.tileSize * factor,
      spacing: placement.spacing.mode === "explicit" ? {
        mode: "explicit",
        horizontal: placement.spacing.horizontal * factor,
        vertical: placement.spacing.vertical * factor
      } : { mode: "density", value: placement.spacing.value / (factor * factor) }
    };
  }
  function scalePrimitive(fill, factor) {
    if (fill.family === "glyph" || fill.family === "svg") {
      return {
        ...fill,
        size: fill.size * factor,
        placement: scalePlacement(fill.placement, factor)
      };
    }
    if (fill.family === "line") {
      return {
        ...fill,
        spacing: fill.spacing * factor,
        strokeWidth: fill.strokeWidth * factor,
        ...fill.dash ? { dash: { length: fill.dash.length * factor, gap: fill.dash.gap * factor } } : {},
        ...fill.oscillation ? {
          oscillation: {
            amplitude: fill.oscillation.amplitude * factor,
            wavelength: fill.oscillation.wavelength * factor
          }
        } : {}
      };
    }
    return {
      ...fill,
      fontSize: fill.fontSize * factor,
      letterSpacing: fill.letterSpacing * factor,
      placement: {
        ...fill.placement,
        horizontalSpacing: fill.placement.horizontalSpacing * factor,
        verticalSpacing: fill.placement.verticalSpacing * factor
      }
    };
  }
  function scaleFill(fill, factor) {
    if (fill.family === "solid") return fill;
    if (fill.family === "composite") {
      return { ...fill, layers: fill.layers.map((layer) => scalePrimitive(layer, factor)) };
    }
    return scalePrimitive(fill, factor);
  }
  function patternAtZoom(pattern, zoom) {
    if (pattern.scale.mode === "screen") return pattern;
    const factor = 2 ** (zoom - pattern.scale.referenceZoom);
    return parsePattern({
      ...pattern,
      id: `${pattern.id}-z${zoom}`,
      fill: scaleFill(pattern.fill, factor),
      scale: { mode: "screen" }
    });
  }
  function patternImages(pattern) {
    if (pattern.fill.family === "solid") return { expression: "", registrations: [] };
    if (pattern.scale.mode === "screen") {
      const imageId = patternImageId(pattern, pattern.id);
      return { expression: imageId, registrations: [{ imageId, pattern }] };
    }
    const firstZoom = Math.max(0, Math.floor(pattern.scale.referenceZoom) - 2);
    const lastZoom = Math.min(22, Math.ceil(pattern.scale.referenceZoom) + 2);
    const registrations = [];
    for (let zoom = firstZoom; zoom <= lastZoom; zoom++) {
      const variant = patternAtZoom(pattern, zoom);
      registrations.push({ imageId: patternImageId(variant, pattern.id), pattern: variant });
    }
    return {
      expression: [
        "step",
        ["zoom"],
        registrations[0].imageId,
        ...registrations.slice(1).flatMap((registration, index) => [
          firstZoom + index + 1,
          registration.imageId
        ])
      ],
      registrations
    };
  }
  function styleContext(options) {
    const source = options.source ?? "<source>";
    const sourceLayer = options.sourceLayer ?? "<source-layer>";
    return {
      source: nonEmptyString5(source, "source"),
      sourceLayer: nonEmptyString5(sourceLayer, "sourceLayer"),
      prefix: nonEmptyString5(options.layerIdPrefix ?? source, "layerIdPrefix")
    };
  }
  function layerBase(id, type, source, sourceLayer) {
    return { id, type, source, "source-layer": sourceLayer };
  }
  function metadata(registrations) {
    const unique = /* @__PURE__ */ new Map();
    for (const registration of registrations) {
      const previous = unique.get(registration.imageId);
      if (previous && serializePattern(previous.pattern) !== serializePattern(registration.pattern)) {
        throw new Error(`Conflicting canonical patterns use image id "${registration.imageId}"`);
      }
      unique.set(registration.imageId, registration);
    }
    return { [CANONICAL_PATTERN_METADATA_KEY]: { patterns: [...unique.values()] } };
  }
  function parseCanonicalPatternMetadata(value) {
    if (typeof value !== "object" || value === null || Array.isArray(value)) {
      throw new TypeError("canonical pattern metadata must be an object");
    }
    const input = value;
    if (!Array.isArray(input.patterns) || input.patterns.length === 0) {
      throw new TypeError("canonical pattern metadata.patterns must be a non-empty array");
    }
    const seen = /* @__PURE__ */ new Map();
    const patterns = input.patterns.map((entry, index) => {
      if (typeof entry !== "object" || entry === null || Array.isArray(entry)) {
        throw new TypeError(`canonical pattern metadata.patterns[${index}] must be an object`);
      }
      const record5 = entry;
      const imageId = nonEmptyString5(record5.imageId, `patterns[${index}].imageId`);
      const pattern = parsePattern(record5.pattern);
      if (pattern.fill.family === "solid") {
        throw new TypeError(`patterns[${index}] must contain a texture-producing Pattern`);
      }
      const signature = serializePattern(pattern);
      const previous = seen.get(imageId);
      if (previous && previous !== signature) {
        throw new Error(`Conflicting canonical patterns use image id "${imageId}"`);
      }
      seen.set(imageId, signature);
      return { imageId, pattern };
    });
    return { patterns };
  }
  function singlePatternLayers(pattern, options) {
    const { source, sourceLayer, prefix } = styleContext(options);
    const layers = [];
    if (pattern.background) {
      layers.push({
        ...layerBase(`${prefix}__bg`, "fill", source, sourceLayer),
        paint: {
          "fill-color": pattern.background.color,
          "fill-opacity": pattern.background.opacity
        }
      });
    }
    if (pattern.fill.family === "solid") {
      layers.push({
        ...layerBase(`${prefix}__solid`, "fill", source, sourceLayer),
        paint: { "fill-color": pattern.fill.color, "fill-opacity": pattern.opacity }
      });
    } else {
      const images = patternImages(pattern);
      layers.push({
        ...layerBase(`${prefix}__pat`, "fill", source, sourceLayer),
        paint: { "fill-pattern": images.expression, "fill-opacity": pattern.opacity },
        metadata: metadata(images.registrations)
      });
    }
    if (pattern.outline) {
      layers.push({
        ...layerBase(`${prefix}__line`, "line", source, sourceLayer),
        paint: {
          "line-color": pattern.outline.color,
          "line-width": pattern.outline.width,
          ...pattern.outline.dash.length ? { "line-dasharray": pattern.outline.dash } : {}
        }
      });
    }
    return { layers };
  }
  function createPatternStyleFragment(value, options = {}) {
    return singlePatternLayers(parsePattern(value), options);
  }
  function matchExpression(property, choices, resolve, fallback) {
    return [
      "match",
      ["get", property],
      ...choices.flatMap(({ key, pattern }) => [key, resolve(pattern)]),
      fallback
    ];
  }
  function collectionLayers(choices, options) {
    const property = nonEmptyString5(options.property, "property");
    const { source, sourceLayer, prefix } = styleContext(options);
    const keyType = typeof choices[0].key;
    if (choices.some(({ key }) => typeof key !== keyType)) {
      throw new TypeError("MapLibre match labels must all use the same key type");
    }
    const layers = [];
    if (choices.some(({ pattern }) => pattern.background)) {
      layers.push({
        ...layerBase(`${prefix}__bg`, "fill", source, sourceLayer),
        paint: {
          "fill-color": matchExpression(
            property,
            choices,
            (pattern) => pattern.background?.color ?? "rgba(0,0,0,0)",
            "rgba(0,0,0,0)"
          ),
          "fill-opacity": matchExpression(
            property,
            choices,
            (pattern) => pattern.background?.opacity ?? 0,
            0
          )
        }
      });
    }
    if (choices.some(({ pattern }) => pattern.fill.family === "solid")) {
      layers.push({
        ...layerBase(`${prefix}__solid`, "fill", source, sourceLayer),
        paint: {
          "fill-color": matchExpression(
            property,
            choices,
            (pattern) => pattern.fill.family === "solid" ? pattern.fill.color : "rgba(0,0,0,0)",
            "rgba(0,0,0,0)"
          ),
          "fill-opacity": matchExpression(
            property,
            choices,
            (pattern) => pattern.fill.family === "solid" ? pattern.opacity : 0,
            0
          )
        }
      });
    }
    const imageByPattern = /* @__PURE__ */ new Map();
    const registrations = [];
    for (const { pattern } of choices) {
      const images = patternImages(pattern);
      imageByPattern.set(pattern, images.expression);
      registrations.push(...images.registrations);
    }
    if (registrations.length > 0) {
      layers.push({
        ...layerBase(`${prefix}__pat`, "fill", source, sourceLayer),
        paint: {
          "fill-pattern": matchExpression(
            property,
            choices,
            (pattern) => imageByPattern.get(pattern) ?? "",
            ""
          ),
          "fill-opacity": matchExpression(
            property,
            choices,
            (pattern) => pattern.fill.family === "solid" ? 0 : pattern.opacity,
            0
          )
        },
        metadata: metadata(registrations)
      });
    }
    for (const { key, pattern } of choices) {
      if (!pattern.outline) continue;
      layers.push({
        ...layerBase(`${prefix}__line_${hash(`${typeof key}:${key}`)}`, "line", source, sourceLayer),
        filter: ["==", ["get", property], key],
        paint: {
          "line-color": pattern.outline.color,
          "line-width": pattern.outline.width,
          ...pattern.outline.dash.length ? { "line-dasharray": pattern.outline.dash } : {}
        }
      });
    }
    return { layers };
  }
  function createPatternSetStyleFragment(value, options) {
    const set = parsePatternSet(value);
    return collectionLayers(
      set.entries.map(({ key, pattern }) => ({ key, pattern })),
      options
    );
  }
  function createPatternSequenceStyleFragment(value, options) {
    const sequence = parsePatternSequence(value);
    return collectionLayers(
      materializePatternSequence(sequence).map(({ index, pattern }) => ({ key: index, pattern })),
      options
    );
  }

  // src/model/materializePlacement.ts
  function materializePatternPlacement(placement, markSize) {
    if (placement.kind === "natural") {
      let spacing;
      if (placement.count !== void 0 && placement.density === void 0) {
        spacing = { mode: "count", value: placement.count };
      } else if (placement.density !== void 0 && placement.count === void 0) {
        spacing = { mode: "density", value: placement.density };
      } else {
        throw new TypeError("natural placement must specify exactly one of density or count");
      }
      return createPlacementLayout({
        tileSize: placement.tileSize,
        markSize,
        spacing,
        seed: placement.seed,
        rotationJitterDeg: placement.rotationJitter,
        scaleJitter: placement.scaleJitter,
        positionJitter: placement.positionJitter,
        distribution: "natural",
        minSpacing: placement.minSpacing
      });
    }
    const distribution = placement.rowOffset !== 0 || placement.columnOffset !== 0 ? "offset" : "regular";
    return createPlacementLayout({
      tileSize: placement.tileSize,
      markSize,
      spacing: placement.spacing.mode === "density" ? { mode: "density", value: placement.spacing.value } : {
        mode: "explicit",
        horizontal: placement.spacing.horizontal,
        vertical: placement.spacing.vertical
      },
      seed: placement.seed,
      rotationJitterDeg: placement.rotationJitter,
      scaleJitter: placement.scaleJitter,
      positionJitter: placement.positionJitter,
      distribution,
      rowOffset: placement.rowOffset,
      columnOffset: placement.columnOffset,
      gridAngle: placement.gridAngle
    });
  }

  // src/model/geometricPatternTile.ts
  function positive3(value, name) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(`${name} must be a finite number greater than 0`);
    }
    return value;
  }
  function clamp012(value) {
    return Math.max(0, Math.min(1, value));
  }
  function parseColor2(value) {
    const hex8 = value.match(/^#([0-9a-f]{8})$/i);
    if (hex8) {
      const number = parseInt(hex8[1], 16);
      return {
        r: number >>> 24 & 255,
        g: number >>> 16 & 255,
        b: number >>> 8 & 255,
        a: (number & 255) / 255
      };
    }
    const hex6 = value.match(/^#([0-9a-f]{6})$/i);
    if (hex6) {
      const number = parseInt(hex6[1], 16);
      return { r: number >> 16 & 255, g: number >> 8 & 255, b: number & 255, a: 1 };
    }
    const hex4 = value.match(/^#([0-9a-f]{4})$/i);
    if (hex4) {
      const [r, g, b, a] = hex4[1].split("").map((entry) => parseInt(entry + entry, 16));
      return { r, g, b, a: a / 255 };
    }
    const hex3 = value.match(/^#([0-9a-f]{3})$/i);
    if (hex3) {
      const [r, g, b] = hex3[1].split("").map((entry) => parseInt(entry + entry, 16));
      return { r, g, b, a: 1 };
    }
    const comma = value.match(
      /^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+%?)\s*)?\)$/i
    );
    const space = value.match(
      /^rgba?\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+%?)\s*)?\)$/i
    );
    const match = comma ?? space;
    if (!match) {
      throw new TypeError(
        `Unsupported color "${value}". Use hex, rgb(), or rgba() for deterministic rendering.`
      );
    }
    const alpha = match[4] === void 0 ? 1 : match[4].endsWith("%") ? parseFloat(match[4]) / 100 : Number(match[4]);
    return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]), a: alpha };
  }
  function blendPixel(data, offset2, color, coverage, opacity2) {
    const sourceAlpha = clamp012(color.a * coverage * opacity2);
    if (sourceAlpha <= 0) return;
    const destinationAlpha = data[offset2 + 3] / 255;
    const resultAlpha = sourceAlpha + destinationAlpha * (1 - sourceAlpha);
    data[offset2] = (color.r * sourceAlpha + data[offset2] * destinationAlpha * (1 - sourceAlpha)) / resultAlpha;
    data[offset2 + 1] = (color.g * sourceAlpha + data[offset2 + 1] * destinationAlpha * (1 - sourceAlpha)) / resultAlpha;
    data[offset2 + 2] = (color.b * sourceAlpha + data[offset2 + 2] * destinationAlpha * (1 - sourceAlpha)) / resultAlpha;
    data[offset2 + 3] = resultAlpha * 255;
  }
  function pointInPolygon(x, y, points) {
    let inside = false;
    for (let index = 0, previous = points.length - 1; index < points.length; previous = index++) {
      const [x1, y1] = points[index];
      const [x2, y2] = points[previous];
      if (y1 > y !== y2 > y && x < (x2 - x1) * (y - y1) / (y2 - y1) + x1) {
        inside = !inside;
      }
    }
    return inside;
  }
  function distanceToSegment(x, y, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const lengthSquared = dx * dx + dy * dy;
    const amount = lengthSquared === 0 ? 0 : clamp012(((x - x1) * dx + (y - y1) * dy) / lengthSquared);
    return Math.hypot(x - (x1 + amount * dx), y - (y1 + amount * dy));
  }
  function pointInGlyph(shape, x, y, size) {
    const half = size / 2;
    if (shape === "circle") return x * x + y * y <= half * half;
    if (shape === "square") return Math.abs(x) <= half && Math.abs(y) <= half;
    if (shape === "diamond") return Math.abs(x) + Math.abs(y) <= half;
    if (shape === "plus") {
      const arm = size / 6;
      return Math.abs(x) <= arm && Math.abs(y) <= half || Math.abs(y) <= arm && Math.abs(x) <= half;
    }
    if (shape === "x") {
      const rotatedX = (x + y) / Math.SQRT2;
      const rotatedY = (y - x) / Math.SQRT2;
      return pointInGlyph("plus", rotatedX, rotatedY, size);
    }
    if (shape === "triangle") {
      return pointInPolygon(x, y, [[0, -half], [half, half], [-half, half]]);
    }
    const stroke = size / 6;
    return distanceToSegment(x, y, -half, -half / 2, 0, half / 2) <= stroke || distanceToSegment(x, y, 0, half / 2, half, -half / 2) <= stroke;
  }
  function glyphTile(fill, pixelRatio2) {
    const logicalSize = fill.placement.tileSize;
    const physicalSize = Math.max(1, Math.round(logicalSize * pixelRatio2));
    const renderScale = physicalSize / logicalSize;
    const data = new Uint8ClampedArray(physicalSize * physicalSize * 4);
    const color = parseColor2(fill.color);
    const placements = materializePatternPlacement(fill.placement, fill.size);
    const sampleOffsets = [0.25, 0.75];
    for (const placement of placements) {
      const renderedSize = fill.size * placement.scale;
      const extent = renderedSize * Math.SQRT2 / 2;
      const minX = Math.max(0, Math.floor((placement.x - extent) * renderScale));
      const maxX = Math.min(physicalSize - 1, Math.ceil((placement.x + extent) * renderScale));
      const minY = Math.max(0, Math.floor((placement.y - extent) * renderScale));
      const maxY = Math.min(physicalSize - 1, Math.ceil((placement.y + extent) * renderScale));
      const angle = -(fill.rotation * Math.PI / 180 + placement.rotationRad);
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      for (let py = minY; py <= maxY; py++) {
        for (let px = minX; px <= maxX; px++) {
          let covered = 0;
          for (const offsetY of sampleOffsets) {
            for (const offsetX of sampleOffsets) {
              const dx = (px + offsetX) / renderScale - placement.x;
              const dy = (py + offsetY) / renderScale - placement.y;
              const localX = (dx * cosine - dy * sine) / placement.scale;
              const localY = (dx * sine + dy * cosine) / placement.scale;
              if (pointInGlyph(fill.glyph, localX, localY, fill.size)) covered++;
            }
          }
          if (covered > 0) {
            blendPixel(data, (py * physicalSize + px) * 4, color, covered / 4, fill.opacity);
          }
        }
      }
    }
    return { width: physicalSize, height: physicalSize, data: new Uint8Array(data.buffer) };
  }
  function preferredLineTileSize(fill) {
    const radians = fill.angle * Math.PI / 180;
    const dominant = Math.max(Math.abs(Math.sin(radians)), Math.abs(Math.cos(radians)), 1e-9);
    const orientationScale = 8 / dominant;
    const normalX = Math.round(-Math.sin(radians) * orientationScale);
    const normalY = Math.round(Math.cos(radians) * orientationScale);
    const orientationPeriod = fill.spacing * Math.hypot(normalX, normalY);
    const detailPeriod = Math.max(
      fill.dash ? fill.dash.length + fill.dash.gap : 0,
      fill.oscillation?.wavelength ?? 0
    ) * 4;
    return Math.max(16, Math.min(512, Math.ceil(Math.max(orientationPeriod, detailPeriod))));
  }
  function phaseVector(angle, tileSize, period, tangent) {
    const radians = angle * Math.PI / 180;
    const targetMagnitude = tileSize / period;
    let x = Math.round((tangent ? Math.cos(radians) : -Math.sin(radians)) * targetMagnitude);
    let y = Math.round((tangent ? Math.sin(radians) : Math.cos(radians)) * targetMagnitude);
    if (x === 0 && y === 0) {
      if (tangent) x = Math.abs(Math.cos(radians)) >= Math.abs(Math.sin(radians)) ? 1 : 0;
      else x = Math.abs(Math.sin(radians)) >= Math.abs(Math.cos(radians)) ? -1 : 0;
      if (x === 0) y = Math.cos(radians) >= 0 ? 1 : -1;
    }
    return { x, y, magnitude: Math.hypot(x, y) };
  }
  function fractional(value) {
    return value - Math.floor(value);
  }
  function lineTile(fill, logicalSize, pixelRatio2) {
    const physicalSize = Math.max(1, Math.round(logicalSize * pixelRatio2));
    const renderScale = physicalSize / logicalSize;
    const data = new Uint8ClampedArray(physicalSize * physicalSize * 4);
    const color = parseColor2(fill.color);
    const normal = phaseVector(fill.angle, logicalSize, fill.spacing, false);
    const normalGradient = normal.magnitude / logicalSize;
    const dashPeriod = fill.dash ? fill.dash.length + fill.dash.gap : void 0;
    const dashVector = dashPeriod === void 0 ? void 0 : phaseVector(fill.angle, logicalSize, dashPeriod, true);
    const waveVector = fill.oscillation === void 0 ? void 0 : phaseVector(fill.angle, logicalSize, fill.oscillation.wavelength, true);
    const halfWidth = fill.strokeWidth / 2;
    for (let py = 0; py < physicalSize; py++) {
      const y = (py + 0.5) / renderScale;
      for (let px = 0; px < physicalSize; px++) {
        const x = (px + 0.5) / renderScale;
        let normalPhase = (normal.x * x + normal.y * y) / logicalSize;
        if (fill.oscillation && waveVector) {
          const wavePhase = (waveVector.x * x + waveVector.y * y) / logicalSize;
          const wave = fill.shape === "wave" ? Math.sin(Math.PI * 2 * wavePhase) : 4 * Math.abs(fractional(wavePhase) - 0.5) - 1;
          normalPhase -= wave * fill.oscillation.amplitude * normalGradient;
        }
        const distance = Math.abs(normalPhase - Math.round(normalPhase)) / normalGradient;
        let coverage = clamp012((halfWidth + 0.5 / renderScale - distance) * renderScale);
        if (coverage > 0 && fill.dash && dashVector) {
          const dashPhase = fractional((dashVector.x * x + dashVector.y * y) / logicalSize);
          const duty = fill.dash.length / dashPeriod;
          if (dashPhase >= duty) coverage = 0;
        }
        if (coverage > 0) {
          blendPixel(data, (py * physicalSize + px) * 4, color, coverage, fill.opacity);
        }
      }
    }
    return { width: physicalSize, height: physicalSize, data: new Uint8Array(data.buffer) };
  }
  function compositeTileSize(layers, requested) {
    if (requested !== void 0) return positive3(requested, "tileSize");
    const glyphSizes = layers.filter((layer) => layer.family === "glyph").map((layer) => layer.placement.tileSize);
    if (glyphSizes.length > 0) {
      if (glyphSizes.some((size) => size !== glyphSizes[0])) {
        throw new Error("composite glyph layers must use the same tileSize");
      }
      return glyphSizes[0];
    }
    const lines = layers.filter((layer) => layer.family === "line");
    return Math.max(...lines.map(preferredLineTileSize));
  }
  function renderPrimitive(fill, tileSize, pixelRatio2) {
    if (fill.family === "glyph") {
      if (fill.placement.tileSize !== tileSize) {
        throw new Error("glyph placement tileSize must match the composite tileSize");
      }
      return glyphTile(fill, pixelRatio2);
    }
    if (fill.family === "line") return lineTile(fill, tileSize, pixelRatio2);
    throw new Error(`${fill.family} fills are not geometric; use their browser renderer`);
  }
  function createGeometricPatternTile(value, options = {}) {
    const pattern = parsePattern(value);
    const pixelRatio2 = positive3(
      options.pixelRatio ?? (pattern.render.pixelRatio === "auto" ? 1 : pattern.render.pixelRatio),
      "pixelRatio"
    );
    const { fill } = pattern;
    if (fill.family === "solid") {
      throw new Error("solid fills use MapLibre fill-color and do not need a pattern tile");
    }
    if (fill.family === "text" || fill.family === "svg") {
      throw new Error(`${fill.family} fills require their browser-specific renderer`);
    }
    if (fill.family === "glyph") return glyphTile(fill, pixelRatio2);
    if (fill.family === "line") {
      const tileSize2 = options.tileSize ?? preferredLineTileSize(fill);
      return lineTile(fill, positive3(tileSize2, "tileSize"), pixelRatio2);
    }
    const unsupported = fill.layers.find((layer) => layer.family === "text" || layer.family === "svg");
    if (unsupported) {
      throw new Error(`${unsupported.family} composite layers require their browser-specific renderer`);
    }
    const tileSize = compositeTileSize(fill.layers, options.tileSize);
    return composeTileImages(fill.layers.map((layer) => ({
      image: renderPrimitive(layer, tileSize, pixelRatio2)
    })));
  }

  // src/maplibre/patternTile.ts
  function positive4(value, name) {
    if (!Number.isFinite(value) || value <= 0) {
      throw new RangeError(`${name} must be a finite number greater than 0`);
    }
    return value;
  }
  function resolvedPixelRatio(pattern, override) {
    if (override !== void 0) return positive4(override, "pixelRatio");
    if (pattern.render.pixelRatio !== "auto") {
      return positive4(pattern.render.pixelRatio, "pattern.render.pixelRatio");
    }
    const displayRatio = typeof globalThis.devicePixelRatio === "number" ? globalThis.devicePixelRatio : 1;
    return Math.min(Math.max(displayRatio, 1), 2);
  }
  function browserCanvas(width, height) {
    if (typeof document === "undefined") {
      throw new Error("SVG and text pattern rasterization requires a browser canvas");
    }
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("2D canvas context unavailable");
    return { canvas, context };
  }
  function canvasTile(context, width, height) {
    const image = context.getImageData(0, 0, width, height);
    return { width, height, data: new Uint8Array(image.data.buffer) };
  }
  async function svgTile(fill, pixelRatio2) {
    const logicalSize = fill.placement.tileSize;
    const physicalSize = Math.max(1, Math.round(logicalSize * pixelRatio2));
    const { context } = browserCanvas(physicalSize, physicalSize);
    const image = await loadSvgImage(fill.svg);
    context.scale(physicalSize / logicalSize, physicalSize / logicalSize);
    context.globalAlpha = fill.opacity;
    const fixedRotation = fill.rotation * Math.PI / 180;
    for (const placement of materializePatternPlacement(fill.placement, fill.size)) {
      context.save();
      context.translate(placement.x, placement.y);
      context.rotate(fixedRotation + placement.rotationRad);
      context.scale(placement.scale, placement.scale);
      context.drawImage(image, -fill.size / 2, -fill.size / 2, fill.size, fill.size);
      context.restore();
    }
    return canvasTile(context, physicalSize, physicalSize);
  }
  function textWidth2(context, characters, letterSpacing) {
    const glyphs = characters.reduce(
      (total, character) => total + context.measureText(character).width,
      0
    );
    return Math.max(1, glyphs + Math.max(0, characters.length - 1) * letterSpacing);
  }
  function fillSpacedText2(context, characters, width, letterSpacing) {
    let x = -width / 2;
    for (const character of characters) {
      const characterWidth = context.measureText(character).width;
      context.fillText(character, x, 0);
      x += characterWidth + letterSpacing;
    }
  }
  async function textTile(fill, pixelRatio2) {
    const font = `${fill.fontStyle} ${fill.fontWeight} ${fill.fontSize}px ${fill.fontFamily}`;
    if (typeof document === "undefined") {
      throw new Error("SVG and text pattern rasterization requires a browser canvas");
    }
    if (document.fonts?.load) {
      await document.fonts.load(font, fill.text.slice(0, 32)).catch(() => void 0);
    }
    const measure = browserCanvas(1, 1).context;
    measure.font = font;
    const characters = Array.from(fill.text);
    const measuredWidth = textWidth2(measure, characters, fill.letterSpacing);
    const metrics = measure.measureText(fill.text);
    const measuredHeight = Math.max(
      fill.fontSize,
      (metrics.actualBoundingBoxAscent || fill.fontSize * 0.8) + (metrics.actualBoundingBoxDescent || fill.fontSize * 0.2)
    );
    const radians = fill.rotation * Math.PI / 180;
    const rotatedWidth = Math.abs(measuredWidth * Math.cos(radians)) + Math.abs(measuredHeight * Math.sin(radians));
    const rotatedHeight = Math.abs(measuredWidth * Math.sin(radians)) + Math.abs(measuredHeight * Math.cos(radians));
    const cellWidth = Math.max(1, Math.ceil(rotatedWidth + fill.placement.horizontalSpacing));
    const cellHeight = Math.max(1, Math.ceil(rotatedHeight + fill.placement.verticalSpacing));
    const logicalWidth = cellWidth;
    const logicalHeight = cellHeight * (fill.placement.rowOffset === 0 ? 1 : 2);
    const width = Math.max(1, Math.round(logicalWidth * pixelRatio2));
    const height = Math.max(1, Math.round(logicalHeight * pixelRatio2));
    const { context } = browserCanvas(width, height);
    context.scale(width / logicalWidth, height / logicalHeight);
    context.font = font;
    context.textAlign = "left";
    context.textBaseline = "middle";
    context.fillStyle = fill.color;
    context.globalAlpha = fill.opacity;
    const rowCount = fill.placement.rowOffset === 0 ? 1 : 2;
    for (let row = -2; row <= rowCount + 1; row++) {
      const rowParity = (row % 2 + 2) % 2;
      const offset2 = rowParity * cellWidth * fill.placement.rowOffset;
      for (let column = -2; column <= 2; column++) {
        context.save();
        context.translate(
          column * cellWidth + cellWidth / 2 + offset2,
          row * cellHeight + cellHeight / 2
        );
        context.rotate(radians);
        fillSpacedText2(context, characters, measuredWidth, fill.letterSpacing);
        context.restore();
      }
    }
    return canvasTile(context, width, height);
  }
  function primitivePattern(pattern, fill) {
    return { ...pattern, fill };
  }
  async function primitiveTile(pattern, fill, pixelRatio2, tileSize) {
    if (fill.family === "svg") return svgTile(fill, pixelRatio2);
    if (fill.family === "text") return textTile(fill, pixelRatio2);
    return createGeometricPatternTile(primitivePattern(pattern, fill), { pixelRatio: pixelRatio2, tileSize });
  }
  async function createPatternTile(value, options = {}) {
    const pattern = parsePattern(value);
    if (pattern.fill.family === "solid") {
      throw new Error("solid fills use MapLibre fill-color and do not need a pattern tile");
    }
    const pixelRatio2 = resolvedPixelRatio(pattern, options.pixelRatio);
    if (pattern.fill.family !== "composite") {
      return primitiveTile(pattern, pattern.fill, pixelRatio2, options.tileSize);
    }
    if (pattern.fill.layers.some((layer) => layer.family === "text")) {
      throw new Error("text layers cannot yet be mixed inside a composite repeat tile");
    }
    const placementSizes = pattern.fill.layers.flatMap((layer) => layer.family === "glyph" || layer.family === "svg" ? [layer.placement.tileSize] : []);
    const tileSize = options.tileSize ?? placementSizes[0];
    if (tileSize !== void 0 && placementSizes.some((size) => size !== tileSize)) {
      throw new Error("composite glyph and SVG layers must use the same tileSize");
    }
    const tiles = await Promise.all(pattern.fill.layers.map(async (layer) => ({
      image: await primitiveTile(pattern, layer, pixelRatio2, tileSize)
    })));
    return composeTileImages(tiles);
  }

  // src/maplibre/installPatternTexture.ts
  var installed = /* @__PURE__ */ new WeakMap();
  var generations = /* @__PURE__ */ new WeakMap();
  function pixelRatio(pattern, override) {
    const ratio = override ?? (pattern.render.pixelRatio === "auto" ? Math.min(Math.max(globalThis.devicePixelRatio ?? 1, 1), 2) : pattern.render.pixelRatio);
    if (!Number.isFinite(ratio) || ratio <= 0) {
      throw new RangeError("pixelRatio must be a finite number greater than 0");
    }
    return ratio;
  }
  async function installPatternTexture(map, options) {
    if (typeof options.imageId !== "string" || options.imageId.trim().length === 0) {
      throw new TypeError("imageId must be a non-empty string");
    }
    const pattern = parsePattern(options.pattern);
    if (pattern.fill.family === "solid") {
      throw new Error("solid fills do not install a pattern texture");
    }
    const ratio = pixelRatio(pattern, options.pixelRatio);
    const signature = `${serializePattern(pattern)}@${ratio}`;
    let byId = installed.get(map);
    if (!byId) {
      byId = /* @__PURE__ */ new Map();
      installed.set(map, byId);
    }
    if (map.hasImage(options.imageId) && byId.get(options.imageId)?.signature === signature) return;
    let generationById = generations.get(map);
    if (!generationById) {
      generationById = /* @__PURE__ */ new Map();
      generations.set(map, generationById);
    }
    const generation = (generationById.get(options.imageId) ?? 0) + 1;
    generationById.set(options.imageId, generation);
    const tile = await createPatternTile(pattern, { pixelRatio: ratio });
    if (generationById.get(options.imageId) !== generation) return;
    const previous = byId.get(options.imageId);
    if (map.hasImage(options.imageId) && previous?.width === tile.width && previous.height === tile.height && previous.pixelRatio === ratio) {
      map.updateImage(options.imageId, tile);
    } else {
      if (map.hasImage(options.imageId)) map.removeImage(options.imageId);
      map.addImage(options.imageId, tile, { pixelRatio: ratio });
    }
    byId.set(options.imageId, {
      signature,
      width: tile.width,
      height: tile.height,
      pixelRatio: ratio
    });
    map.triggerRepaint();
  }

  // src/maplibre/installPatternFills.ts
  async function installPatternFills(map, style) {
    const installed2 = /* @__PURE__ */ new Map();
    const pending = [];
    for (const layer of style.layers) {
      const metadata2 = layer.metadata;
      if (!metadata2) continue;
      const canonical = metadata2[CANONICAL_PATTERN_METADATA_KEY];
      if (canonical) {
        const registration2 = parseCanonicalPatternMetadata(canonical);
        for (const item of registration2.patterns) {
          const signature = `canonical:${JSON.stringify(item.pattern)}`;
          const previous = installed2.get(item.imageId);
          if (previous && previous !== signature) {
            throw new Error(`Conflicting pattern definitions use image id "${item.imageId}"`);
          }
          if (previous) continue;
          installed2.set(item.imageId, signature);
          pending.push(installPatternTexture(map, item));
        }
      }
      const rawDefinition = metadata2[PATTERN_METADATA_KEY];
      if (!rawDefinition) continue;
      const registration = parsePatternMetadata(rawDefinition);
      const definitions = [
        { imageId: registration.imageId, definition: registration.definition },
        ...registration.variants ?? []
      ];
      for (const item of definitions) {
        const signature = `legacy:${serializePatternDefinition(item.definition)}`;
        const previous = installed2.get(item.imageId);
        if (previous && previous !== signature) {
          throw new Error(`Conflicting pattern definitions use image id "${item.imageId}"`);
        }
        if (previous) continue;
        installed2.set(item.imageId, signature);
        const p = item.definition;
        if (p.kind === "geometric") {
          syncPatternTexture(map, {
            imageId: item.imageId,
            pattern: p.pattern,
            size: p.size,
            color: p.color,
            weight: p.weight,
            angle: p.angle,
            pixelRatio: p.pixelRatio,
            stippleCount: p.stippleCount
          });
        } else if (p.kind === "svg") {
          pending.push(installSvgPatternFill(map, { imageId: item.imageId, ...p }));
        } else {
          pending.push(installFontPatternFill(map, { imageId: item.imageId, ...p }));
        }
      }
    }
    await Promise.all(pending);
  }

  // src/maplibre/addPatternFill.ts
  function nonEmptyString6(value, name) {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new TypeError(`${name} must be a non-empty string`);
    }
  }
  async function waitForStyle(map) {
    if (map.getStyle()) return;
    await new Promise((resolve) => {
      map.once("style.load", () => resolve());
    });
  }
  async function addPatternFill(map, options) {
    nonEmptyString6(options.sourceId, "sourceId");
    if (options.sourceLayer !== void 0 && options.sourceLayer !== null) {
      nonEmptyString6(options.sourceLayer, "sourceLayer");
    }
    if (options.beforeId !== void 0) {
      nonEmptyString6(options.beforeId, "beforeId");
    }
    if (!options.pattern || !Array.isArray(options.pattern.layers)) {
      throw new TypeError("pattern.layers must be an array");
    }
    if (options.pattern.layers.length === 0) {
      throw new RangeError("pattern.layers must contain at least one layer");
    }
    await waitForStyle(map);
    if (!map.getSource(options.sourceId)) {
      throw new Error(`MapLibre source "${options.sourceId}" was not found`);
    }
    if (options.beforeId && !map.getLayer(options.beforeId)) {
      throw new Error(`MapLibre layer "${options.beforeId}" was not found`);
    }
    const layers = options.pattern.layers.map((template, index) => {
      if (!template || typeof template !== "object") {
        throw new TypeError(`pattern.layers[${index}] must be an object`);
      }
      nonEmptyString6(template.id, `pattern.layers[${index}].id`);
      nonEmptyString6(template.type, `pattern.layers[${index}].type`);
      const layer = {
        ...template,
        id: template.id.split("<source>").join(options.sourceId),
        source: options.sourceId
      };
      if (options.sourceLayer === void 0 || options.sourceLayer === null) {
        delete layer["source-layer"];
      } else {
        layer["source-layer"] = options.sourceLayer;
      }
      return layer;
    });
    const layerIds = layers.map((layer) => layer.id);
    const uniqueIds = new Set(layerIds);
    if (uniqueIds.size !== layerIds.length) {
      throw new Error("Pattern fill contains duplicate layer ids");
    }
    for (const layerId of layerIds) {
      if (map.getLayer(layerId)) {
        throw new Error(`MapLibre layer "${layerId}" already exists`);
      }
    }
    await installPatternFills(map, { layers });
    const addedLayerIds = [];
    try {
      for (const layer of layers) {
        map.addLayer(layer, options.beforeId);
        addedLayerIds.push(layer.id);
      }
    } catch (error) {
      for (const layerId of addedLayerIds.reverse()) {
        if (map.getLayer(layerId)) map.removeLayer(layerId);
      }
      throw error;
    }
    return { layerIds };
  }

  // src/maplibre/observePatternFills.ts
  function observePatternFills(map, options = {}) {
    const getStyle = options.getStyle ?? (() => map.getStyle());
    const onError = options.onError ?? ((error) => {
      console.error("stipple-maplibre: failed to restore pattern images", error);
    });
    let disposed = false;
    const refresh = async () => {
      if (disposed) return;
      await installPatternFills(map, getStyle());
    };
    const onStyleLoad = () => {
      void refresh().catch(onError);
    };
    map.on("style.load", onStyleLoad);
    return {
      refresh,
      dispose() {
        if (disposed) return;
        disposed = true;
        map.off("style.load", onStyleLoad);
      }
    };
  }

  // src/maplibre/patternSetExpression.ts
  function createPatternSetExpression(value, options) {
    const patternSet = parsePatternSet(value);
    if (typeof options.property !== "string" || options.property.trim().length === 0) {
      throw new TypeError("property must be a non-empty string");
    }
    const keyType = typeof patternSet.entries[0].key;
    if (patternSet.entries.some((entry) => typeof entry.key !== keyType)) {
      throw new TypeError("MapLibre match labels must all use the same key type");
    }
    const resolve = options.resolve ?? ((pattern) => pattern.id);
    const expression = [
      "match",
      ["get", options.property]
    ];
    for (const entry of patternSet.entries) {
      const output = resolve(entry.pattern);
      if (typeof output !== "string" || output.length === 0) {
        throw new TypeError("resolve must return a non-empty string for every Pattern");
      }
      expression.push(entry.key, output);
    }
    expression.push(options.fallback ?? "");
    return expression;
  }

  // src/maplibre/patternSequenceExpression.ts
  function createPatternSequenceExpression(sequence, options) {
    if (typeof options.property !== "string" || options.property.trim().length === 0) {
      throw new TypeError("property must be a non-empty string");
    }
    const resolve = options.resolve ?? ((pattern) => pattern.id);
    const expression = [
      "match",
      ["get", options.property]
    ];
    for (const step of materializePatternSequence(sequence)) {
      const output = resolve(step.pattern, step.index);
      if (typeof output !== "string" || output.length === 0) {
        throw new TypeError("resolve must return a non-empty string for every Pattern");
      }
      expression.push(step.index, output);
    }
    expression.push(options.fallback ?? "");
    return expression;
  }

  // src/model/legacyPatternDefinition.ts
  var DEFAULT_STIPPLE_COUNT2 = 7;
  function lineFromGeometric(definition, angle, spacing) {
    return {
      family: "line",
      shape: "straight",
      color: definition.color,
      angle,
      spacing,
      strokeWidth: definition.weight,
      opacity: 1
    };
  }
  function geometricFill(definition) {
    if (definition.pattern === "hachures") {
      return lineFromGeometric(definition, definition.angle, definition.size / 2);
    }
    if (definition.pattern === "cross") {
      return {
        family: "composite",
        composition: "crosshatch",
        layers: [
          lineFromGeometric(definition, definition.angle, definition.size / 2),
          lineFromGeometric(
            definition,
            (definition.angle + 90 + 45) % 180 - 45,
            definition.size / 2
          )
        ]
      };
    }
    if (definition.pattern === "grid") {
      return {
        family: "composite",
        composition: "grid",
        layers: [
          lineFromGeometric(definition, 0, definition.size),
          lineFromGeometric(definition, 90, definition.size)
        ]
      };
    }
    if (definition.pattern === "dots") {
      return {
        family: "glyph",
        glyph: "circle",
        color: definition.color,
        size: definition.weight,
        // Rotation is visually inert for a circle, but retaining it makes the
        // adapter lossless for legacy definitions that happened to carry one.
        rotation: definition.angle,
        opacity: 1,
        placement: {
          kind: "lattice",
          tileSize: definition.size,
          spacing: { mode: "explicit", horizontal: definition.size, vertical: definition.size },
          rowOffset: 0,
          columnOffset: 0,
          gridAngle: 0,
          positionJitter: 0,
          rotationJitter: 0,
          scaleJitter: 0,
          seed: 1
        }
      };
    }
    const count = definition.stippleCount ?? DEFAULT_STIPPLE_COUNT2;
    return {
      family: "glyph",
      glyph: "circle",
      color: definition.color,
      size: definition.weight * 1.2,
      rotation: definition.angle,
      opacity: 1,
      placement: {
        kind: "natural",
        tileSize: definition.size,
        count,
        minSpacing: 0,
        positionJitter: 0,
        rotationJitter: 0,
        scaleJitter: 0,
        seed: `stipple:fixed:${count}`
      }
    };
  }
  function svgFill(definition) {
    const common = {
      tileSize: definition.tileSize,
      minSpacing: definition.minSpacing,
      positionJitter: definition.positionJitter,
      rotationJitter: definition.rotationJitterDeg,
      scaleJitter: definition.scaleJitter,
      seed: definition.seed
    };
    return {
      family: "svg",
      svg: definition.svg,
      size: definition.stampSize,
      rotation: 0,
      opacity: 1,
      placement: definition.distribution === "natural" ? { kind: "natural", density: definition.density, ...common } : {
        kind: "lattice",
        tileSize: definition.tileSize,
        spacing: { mode: "density", value: definition.density },
        rowOffset: definition.distribution === "offset" ? 0.5 : 0,
        columnOffset: 0,
        gridAngle: 0,
        positionJitter: definition.positionJitter,
        rotationJitter: definition.rotationJitterDeg,
        scaleJitter: definition.scaleJitter,
        seed: definition.seed
      }
    };
  }
  function textFill(definition) {
    return {
      family: "text",
      text: definition.text,
      color: definition.color,
      fontFamily: definition.fontFamily,
      fontSize: definition.fontSize,
      fontWeight: definition.fontWeight,
      fontStyle: definition.fontStyle,
      letterSpacing: definition.letterSpacing,
      rotation: definition.rotationDeg,
      opacity: 1,
      placement: {
        kind: "text-lattice",
        horizontalSpacing: definition.horizontalSpacing,
        verticalSpacing: definition.verticalSpacing,
        rowOffset: definition.stagger ? 0.5 : 0
      }
    };
  }
  function patternFromLegacyDefinition(value, options = {}) {
    const definition = parsePatternDefinition(value);
    const fill = definition.kind === "geometric" ? geometricFill(definition) : definition.kind === "svg" ? svgFill(definition) : textFill(definition);
    return parsePattern({
      version: 1,
      kind: "pattern",
      id: options.id ?? patternDefinitionId(definition, "pattern"),
      ...options.name === void 0 ? {} : { name: options.name },
      fill,
      opacity: options.opacity ?? 1,
      ...options.background === void 0 ? {} : { background: options.background },
      ...options.outline === void 0 ? {} : { outline: options.outline },
      scale: options.scale ?? { mode: "screen" },
      render: {
        pixelRatio: definition.kind === "geometric" && definition.pixelRatio !== void 0 ? definition.pixelRatio : "auto"
      }
    });
  }
  function assertPrimitiveOpacity(fill) {
    if (fill.opacity !== 1) {
      throw new Error("legacy PatternDefinition cannot represent per-primitive opacity");
    }
  }
  function geometricBase(pattern, color) {
    return {
      color,
      ...pattern.render.pixelRatio === "auto" ? {} : { pixelRatio: pattern.render.pixelRatio }
    };
  }
  function lineDefinition(pattern, fill) {
    assertPrimitiveOpacity(fill);
    if (fill.shape !== "straight" || fill.dash || fill.oscillation) {
      throw new Error("legacy PatternDefinition can only represent straight line fills");
    }
    return {
      kind: "geometric",
      pattern: "hachures",
      size: fill.spacing * 2,
      ...geometricBase(pattern, fill.color),
      weight: fill.strokeWidth,
      angle: fill.angle
    };
  }
  function sameLineStyle(first, second) {
    return first.shape === "straight" && second.shape === "straight" && first.color === second.color && first.spacing === second.spacing && first.strokeWidth === second.strokeWidth && first.opacity === second.opacity && first.dash === void 0 && second.dash === void 0 && first.oscillation === void 0 && second.oscillation === void 0;
  }
  function compositeDefinition(pattern, fill) {
    if (fill.layers.length !== 2 || fill.layers.some((layer) => layer.family !== "line")) {
      throw new Error("legacy PatternDefinition can only represent grid or crosshatch composites");
    }
    const [first, second] = fill.layers;
    assertPrimitiveOpacity(first);
    assertPrimitiveOpacity(second);
    if (!sameLineStyle(first, second)) {
      throw new Error("legacy grid and crosshatch layers must share one line style");
    }
    const angles = [first.angle, second.angle].sort((a, b) => a - b);
    if (fill.composition === "grid" && angles[0] === 0 && angles[1] === 90) {
      return {
        kind: "geometric",
        pattern: "grid",
        size: first.spacing,
        ...geometricBase(pattern, first.color),
        weight: first.strokeWidth,
        angle: 0
      };
    }
    const expectedSecond = (first.angle + 90 + 45) % 180 - 45;
    if (fill.composition !== "crosshatch" || second.angle !== expectedSecond) {
      throw new Error("composite is not a legacy crosshatch");
    }
    return {
      kind: "geometric",
      pattern: "cross",
      size: first.spacing * 2,
      ...geometricBase(pattern, first.color),
      weight: first.strokeWidth,
      angle: first.angle
    };
  }
  function glyphDefinition(pattern, fill) {
    assertPrimitiveOpacity(fill);
    if (fill.glyph !== "circle") {
      throw new Error("legacy PatternDefinition can only represent circle glyphs");
    }
    if (fill.placement.kind === "lattice") {
      const placement = fill.placement;
      if (placement.spacing.mode !== "explicit" || placement.spacing.horizontal !== placement.tileSize || placement.spacing.vertical !== placement.tileSize || placement.rowOffset !== 0 || placement.columnOffset !== 0 || placement.gridAngle !== 0 || placement.positionJitter !== 0 || placement.rotationJitter !== 0 || placement.scaleJitter !== 0) {
        throw new Error("circle lattice is not representable as legacy dots");
      }
      return {
        kind: "geometric",
        pattern: "dots",
        size: placement.tileSize,
        ...geometricBase(pattern, fill.color),
        weight: fill.size,
        angle: fill.rotation
      };
    }
    const count = fill.placement.count;
    if (count === void 0 || fill.placement.density !== void 0 || fill.placement.minSpacing !== 0 || fill.placement.positionJitter !== 0 || fill.placement.rotationJitter !== 0 || fill.placement.scaleJitter !== 0 || fill.placement.seed !== `stipple:fixed:${count}`) {
      throw new Error("natural circle placement is not representable as legacy stipple");
    }
    return {
      kind: "geometric",
      pattern: "stipple",
      size: fill.placement.tileSize,
      ...geometricBase(pattern, fill.color),
      weight: fill.size / 1.2,
      angle: fill.rotation,
      ...count === DEFAULT_STIPPLE_COUNT2 ? {} : { stippleCount: count }
    };
  }
  function svgDefinition(fill) {
    assertPrimitiveOpacity(fill);
    if (fill.rotation !== 0) {
      throw new Error("legacy SVG PatternDefinition cannot represent fixed rotation");
    }
    const placement = fill.placement;
    if (placement.kind === "natural") {
      if (placement.density === void 0 || placement.count !== void 0) {
        throw new Error("legacy SVG PatternDefinition requires density-based placement");
      }
      return {
        kind: "svg",
        svg: fill.svg,
        tileSize: placement.tileSize,
        stampSize: fill.size,
        density: placement.density,
        seed: placement.seed,
        rotationJitterDeg: placement.rotationJitter,
        scaleJitter: placement.scaleJitter,
        positionJitter: placement.positionJitter,
        stagger: false,
        distribution: "natural",
        minSpacing: placement.minSpacing
      };
    }
    if (placement.spacing.mode !== "density" || placement.columnOffset !== 0 || placement.gridAngle !== 0 || ![0, 0.5].includes(placement.rowOffset)) {
      throw new Error("SVG lattice is not representable by legacy density placement");
    }
    return {
      kind: "svg",
      svg: fill.svg,
      tileSize: placement.tileSize,
      stampSize: fill.size,
      density: placement.spacing.value,
      seed: placement.seed,
      rotationJitterDeg: placement.rotationJitter,
      scaleJitter: placement.scaleJitter,
      positionJitter: placement.positionJitter,
      stagger: placement.rowOffset === 0.5,
      distribution: placement.rowOffset === 0.5 ? "offset" : "regular",
      minSpacing: 0
    };
  }
  function fontDefinition(fill) {
    assertPrimitiveOpacity(fill);
    if (![0, 0.5].includes(fill.placement.rowOffset)) {
      throw new Error("text row offset is not representable by legacy stagger");
    }
    return {
      kind: "font",
      text: fill.text,
      fontFamily: fill.fontFamily,
      fontSize: fill.fontSize,
      fontWeight: fill.fontWeight,
      fontStyle: fill.fontStyle,
      letterSpacing: fill.letterSpacing,
      horizontalSpacing: fill.placement.horizontalSpacing,
      verticalSpacing: fill.placement.verticalSpacing,
      rotationDeg: fill.rotation,
      stagger: fill.placement.rowOffset === 0.5,
      color: fill.color
    };
  }
  function patternToLegacyDefinition(value) {
    const pattern = parsePattern(value);
    const { fill } = pattern;
    if (fill.family === "solid") {
      throw new Error("solid fills do not have a legacy PatternDefinition texture recipe");
    }
    const definition = fill.family === "glyph" ? glyphDefinition(pattern, fill) : fill.family === "line" ? lineDefinition(pattern, fill) : fill.family === "composite" ? compositeDefinition(pattern, fill) : fill.family === "svg" ? svgDefinition(fill) : fontDefinition(fill);
    return parsePatternDefinition(definition);
  }

  // src/maplibre/scatterIconPoints.ts
  function toPolygons(polygon) {
    return polygon.type === "Polygon" ? [polygon.coordinates] : polygon.coordinates;
  }
  function componentSeed(seed2, index) {
    const base = seed2 ?? 1;
    return typeof base === "string" ? `${base}:${index}` : base + Math.imul(index, 2654435761);
  }
  function scatterIconPoints(options) {
    const {
      map,
      polygon,
      iconRadiusPx,
      density,
      seed: seed2,
      rotationJitterDeg,
      scaleJitter,
      positionJitter,
      stagger,
      distribution,
      minSpacing,
      viewportPaddingPx
    } = options;
    let clipBounds;
    if (viewportPaddingPx !== void 0) {
      if (!Number.isFinite(viewportPaddingPx) || viewportPaddingPx < 0) {
        throw new RangeError("viewportPaddingPx must be a finite number greater than or equal to 0");
      }
      const canvas = map.getCanvas?.();
      if (canvas) {
        const pixelRatio2 = globalThis.devicePixelRatio || 1;
        const width = canvas.clientWidth || canvas.width / pixelRatio2;
        const height = canvas.clientHeight || canvas.height / pixelRatio2;
        clipBounds = {
          minX: -viewportPaddingPx,
          minY: -viewportPaddingPx,
          maxX: width + viewportPaddingPx,
          maxY: height + viewportPaddingPx
        };
      }
    }
    const points = toPolygons(polygon).flatMap((polygonRings, polygonIndex) => {
      const pixelRings = polygonRings.map(
        (ring2) => ring2.map(([lng, lat]) => {
          const p = map.project([lng, lat]);
          return [p.x, p.y];
        })
      );
      return scatterPointsInPolygon(pixelRings, {
        radius: iconRadiusPx,
        density,
        seed: componentSeed(seed2, polygonIndex),
        rotationJitterDeg,
        scaleJitter,
        positionJitter,
        stagger,
        distribution,
        minSpacing,
        clipBounds
      });
    });
    const features = points.map(({ x, y, rotation, scale }, index) => {
      const lngLat = map.unproject([x, y]);
      return {
        type: "Feature",
        id: index,
        geometry: { type: "Point", coordinates: [lngLat.lng, lngLat.lat] },
        properties: { rotation, scale }
      };
    });
    return { type: "FeatureCollection", features };
  }

  // src/maplibre/svgIcon.ts
  var installedSvgIcons = /* @__PURE__ */ new WeakMap();
  async function addSvgIcon(map, options) {
    const { id, svg, size = 32, pixelRatio: pixelRatio2 = 2 } = options;
    const px = Math.round(size * pixelRatio2);
    const signature = `${size}@${pixelRatio2}:${svg}`;
    let installedById = installedSvgIcons.get(map);
    if (!installedById) {
      installedById = /* @__PURE__ */ new Map();
      installedSvgIcons.set(map, installedById);
    }
    const previous = installedById.get(id);
    if (map.hasImage(id) && previous?.signature === signature) {
      return { id, width: previous.width, height: previous.height };
    }
    const image = await loadSvgImage(svg);
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = px;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("2D canvas context unavailable");
    ctx.clearRect(0, 0, px, px);
    ctx.drawImage(image, 0, 0, px, px);
    const imageData = ctx.getImageData(0, 0, px, px);
    const tile = { width: px, height: px, data: new Uint8Array(imageData.data.buffer) };
    if (map.hasImage(id) && previous?.width === px && previous.height === px && previous.pixelRatio === pixelRatio2) {
      map.updateImage(id, tile);
    } else {
      if (map.hasImage(id)) map.removeImage(id);
      map.addImage(id, tile, { pixelRatio: pixelRatio2 });
    }
    installedById.set(id, {
      signature,
      width: px,
      height: px,
      pixelRatio: pixelRatio2
    });
    return { id, width: px, height: px };
  }

  // src/maplibre/svgIconScatter.ts
  var installedScatterFeatures = /* @__PURE__ */ new WeakMap();
  var installedScatterLayerStates = /* @__PURE__ */ new WeakMap();
  function featureDiff(previous, next) {
    const [previousLng, previousLat] = previous.geometry.coordinates;
    const [nextLng, nextLat] = next.geometry.coordinates;
    const geometryChanged = previousLng !== nextLng || previousLat !== nextLat;
    const propertiesChanged = previous.properties.rotation !== next.properties.rotation || previous.properties.scale !== next.properties.scale;
    if (!geometryChanged && !propertiesChanged) return void 0;
    return {
      id: next.id,
      ...geometryChanged ? { newGeometry: next.geometry } : {},
      ...propertiesChanged ? {
        addOrUpdateProperties: [
          { key: "rotation", value: next.properties.rotation },
          { key: "scale", value: next.properties.scale }
        ]
      } : {}
    };
  }
  function scatterSourceDiff(previous, next) {
    const sharedCount = Math.min(previous.length, next.length);
    const update = [];
    for (let index = 0; index < sharedCount; index++) {
      const diff = featureDiff(previous[index], next[index]);
      if (diff) update.push(diff);
    }
    return {
      ...previous.length > next.length ? { remove: previous.slice(next.length).map(({ id }) => id) } : {},
      ...next.length > previous.length ? { add: next.slice(previous.length) } : {},
      ...update.length ? { update } : {}
    };
  }
  async function updateScatterSource(map, sourceId, points) {
    let featuresBySource = installedScatterFeatures.get(map);
    if (!featuresBySource) {
      featuresBySource = /* @__PURE__ */ new Map();
      installedScatterFeatures.set(map, featuresBySource);
    }
    const previous = featuresBySource.get(sourceId);
    featuresBySource.set(sourceId, points.features);
    const existingSource = map.getSource(sourceId);
    if (!existingSource) {
      map.addSource(sourceId, {
        type: "geojson",
        data: points,
        // Point geometry does not need high-zoom vector-tile subdivision.
        // Overscaling above z14 preserves positions while reducing rebuild work.
        maxzoom: 14
      });
      return;
    }
    if (previous && typeof existingSource.updateData === "function") {
      const diff = scatterSourceDiff(previous, points.features);
      if (!diff.add && !diff.remove && !diff.update) return;
      try {
        await existingSource.updateData(diff);
        return;
      } catch {
      }
    }
    existingSource.setData(points);
  }
  async function installSvgIconScatter(map, options) {
    const {
      sourceId,
      layerId,
      iconId,
      polygon,
      svg,
      size = 32,
      density,
      seed: seed2,
      rotationJitterDeg,
      scaleJitter,
      positionJitter,
      stagger,
      distribution,
      minSpacing,
      opacity: opacity2 = 1,
      scaleMode = "screen",
      edgeClearance = true,
      viewportPaddingPx
    } = options;
    if (scaleMode !== "screen" && scaleMode !== "map") {
      throw new TypeError("scaleMode must be screen or map");
    }
    await addSvgIcon(map, { id: iconId, svg, size });
    const approximateSpacing = density && density > 0 ? 100 / Math.sqrt(density) : 100;
    const screenPadding = viewportPaddingPx ?? Math.max(
      192,
      size * (1 + (scaleJitter ?? 0)) * 2,
      approximateSpacing * 2
    );
    const points = scatterIconPoints({
      map,
      polygon,
      iconRadiusPx: edgeClearance ? size / Math.SQRT2 : 0,
      density,
      seed: seed2,
      rotationJitterDeg,
      scaleJitter,
      positionJitter,
      stagger,
      distribution,
      minSpacing,
      viewportPaddingPx: scaleMode === "screen" ? screenPadding : void 0
    });
    await updateScatterSource(map, sourceId, points);
    const iconSize = scaleMode === "map" ? [
      "interpolate",
      ["exponential", 2],
      ["zoom"],
      map.getZoom() - 8,
      ["*", ["get", "scale"], 1 / 256],
      map.getZoom(),
      ["get", "scale"],
      map.getZoom() + 8,
      ["*", ["get", "scale"], 256]
    ] : ["get", "scale"];
    let layerStates = installedScatterLayerStates.get(map);
    if (!layerStates) {
      layerStates = /* @__PURE__ */ new Map();
      installedScatterLayerStates.set(map, layerStates);
    }
    const layerModeSignature = scaleMode === "screen" ? "screen" : `map:${map.getZoom()}`;
    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: "symbol",
        source: sourceId,
        layout: {
          "icon-image": iconId,
          "icon-rotate": ["get", "rotation"],
          "icon-size": iconSize,
          "icon-allow-overlap": true,
          "icon-ignore-placement": true,
          "symbol-z-order": "source"
        },
        paint: {
          "icon-opacity": opacity2
        }
      });
      layerStates.set(layerId, {
        mode: layerModeSignature,
        iconId,
        opacity: opacity2
      });
    } else {
      const previousLayer = layerStates.get(layerId);
      if (previousLayer?.mode !== layerModeSignature) {
        map.setLayoutProperty(layerId, "icon-size", iconSize);
      }
      if (previousLayer?.iconId !== iconId) {
        map.setLayoutProperty(layerId, "icon-image", iconId);
      }
      if (previousLayer?.opacity !== opacity2) {
        map.setPaintProperty(layerId, "icon-opacity", opacity2);
      }
      layerStates.set(layerId, {
        mode: layerModeSignature,
        iconId,
        opacity: opacity2
      });
    }
  }
  return __toCommonJS(src_exports);
})();
