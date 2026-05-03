from __future__ import annotations

import math
import random
import struct
import zlib
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

Color = tuple[int, int, int]


def hex_color(value: str) -> Color:
    value = value.lstrip("#")
    return tuple(int(value[i : i + 2], 16) for i in (0, 2, 4))  # type: ignore[return-value]


class Canvas:
    def __init__(self, width: int, height: int, bg: str = "#ffffff") -> None:
        self.width = width
        self.height = height
        self.pixels = bytearray(hex_color(bg) * (width * height))

    def set_pixel(self, x: int, y: int, color: Color) -> None:
        if 0 <= x < self.width and 0 <= y < self.height:
            idx = (y * self.width + x) * 3
            self.pixels[idx : idx + 3] = bytes(color)

    def rect(self, x: int, y: int, w: int, h: int, color: str) -> None:
        c = hex_color(color)
        x0, x1 = max(0, x), min(self.width, x + w)
        y0, y1 = max(0, y), min(self.height, y + h)
        row = bytes(c) * max(0, x1 - x0)
        for yy in range(y0, y1):
            idx = (yy * self.width + x0) * 3
            self.pixels[idx : idx + len(row)] = row

    def border_rect(self, x: int, y: int, w: int, h: int, color: str, thickness: int = 1) -> None:
        self.rect(x, y, w, thickness, color)
        self.rect(x, y + h - thickness, w, thickness, color)
        self.rect(x, y, thickness, h, color)
        self.rect(x + w - thickness, y, thickness, h, color)

    def line(self, x0: float, y0: float, x1: float, y1: float, color: str, width: int = 1) -> None:
        c = hex_color(color)
        steps = int(max(abs(x1 - x0), abs(y1 - y0))) + 1
        radius = max(0, width // 2)
        for i in range(steps + 1):
            t = i / max(1, steps)
            x = round(x0 + (x1 - x0) * t)
            y = round(y0 + (y1 - y0) * t)
            for yy in range(y - radius, y + radius + 1):
                for xx in range(x - radius, x + radius + 1):
                    if (xx - x) ** 2 + (yy - y) ** 2 <= radius * radius + 1:
                        self.set_pixel(xx, yy, c)

    def polyline(self, points: list[tuple[float, float]], color: str, width: int = 1) -> None:
        for a, b in zip(points, points[1:]):
            self.line(a[0], a[1], b[0], b[1], color, width)

    def ellipse(self, cx: float, cy: float, rx: float, ry: float, color: str, width: int = 1, start: float = 0, end: float = math.tau) -> None:
        points = []
        samples = max(80, int((rx + ry) * 1.2))
        for i in range(samples + 1):
            t = start + (end - start) * i / samples
            points.append((cx + math.cos(t) * rx, cy + math.sin(t) * ry))
        self.polyline(points, color, width)

    def fill_ellipse(self, cx: int, cy: int, rx: int, ry: int, color: str) -> None:
        c = hex_color(color)
        for y in range(cy - ry, cy + ry + 1):
            yy = (y - cy) / ry
            if abs(yy) > 1:
                continue
            half = int(rx * math.sqrt(1 - yy * yy))
            for x in range(cx - half, cx + half + 1):
                self.set_pixel(x, y, c)

    def save(self, path: Path) -> None:
        raw = bytearray()
        for y in range(self.height):
            raw.append(0)
            start = y * self.width * 3
            raw.extend(self.pixels[start : start + self.width * 3])
        data = zlib.compress(bytes(raw), 9)

        def chunk(kind: bytes, payload: bytes) -> bytes:
            return (
                struct.pack(">I", len(payload))
                + kind
                + payload
                + struct.pack(">I", zlib.crc32(kind + payload) & 0xFFFFFFFF)
            )

        png = b"\x89PNG\r\n\x1a\n"
        png += chunk(b"IHDR", struct.pack(">IIBBBBB", self.width, self.height, 8, 2, 0, 0, 0))
        png += chunk(b"IDAT", data)
        png += chunk(b"IEND", b"")
        path.write_bytes(png)


def hero_portrait() -> None:
    c = Canvas(760, 940, "#fbfbfa")
    # Gentle paper texture.
    random.seed(4)
    for _ in range(1800):
        x = random.randrange(c.width)
        y = random.randrange(c.height)
        shade = random.choice(["#f0f0ee", "#f6f6f4", "#eeeeec"])
        c.set_pixel(x, y, hex_color(shade))

    # Shoulder and jacket sketch.
    c.polyline([(178, 830), (250, 710), (325, 675), (430, 676), (512, 716), (595, 834)], "#171717", 5)
    c.polyline([(234, 905), (263, 744), (327, 698), (380, 722), (432, 697), (506, 748), (535, 906)], "#2d2d2d", 2)
    c.line(344, 715, 306, 895, "#343434", 2)
    c.line(418, 715, 461, 895, "#343434", 2)

    # Neck and face.
    c.polyline([(336, 650), (333, 705), (381, 733), (430, 704), (424, 647)], "#171717", 4)
    face = [(286, 356), (272, 420), (278, 506), (301, 588), (347, 642), (382, 655), (420, 642), (468, 588), (491, 506), (496, 420), (481, 356), (439, 306), (382, 292), (328, 307), (286, 356)]
    c.polyline(face, "#111111", 5)

    # Hair mass and sketch strokes.
    c.polyline([(272, 368), (295, 300), (357, 260), (436, 278), (488, 335), (503, 407)], "#111111", 9)
    for offset in range(0, 90, 12):
        c.polyline([(300 + offset, 315 - offset * 0.18), (330 + offset * 0.6, 276 + offset * 0.15), (374 + offset * 0.48, 292 + offset * 0.2)], "#2f2f2f", 2)
    c.polyline([(290, 393), (318, 346), (371, 332), (435, 344), (481, 392)], "#222222", 4)

    # Features.
    c.line(321, 433, 363, 425, "#151515", 3)
    c.line(407, 425, 449, 433, "#151515", 3)
    c.line(334, 454, 354, 454, "#151515", 2)
    c.line(418, 454, 438, 454, "#151515", 2)
    c.polyline([(385, 456), (377, 503), (392, 514), (375, 524)], "#1e1e1e", 2)
    c.polyline([(345, 566), (374, 579), (410, 579), (437, 566)], "#171717", 3)
    c.line(358, 599, 421, 600, "#777777", 1)
    c.ellipse(382, 475, 116, 158, "#a8a8a8", 1, start=0.18, end=2.9)

    # Editorial hatching.
    for i in range(20):
        y = 690 + i * 9
        c.line(212, y, 318, y + 52, "#dadada", 1)
        c.line(548, y, 445, y + 52, "#dadada", 1)
    c.save(PUBLIC / "hero-portrait.png")


def about_photo() -> None:
    c = Canvas(520, 640, "#f3f2ef")
    random.seed(8)
    for _ in range(1200):
        x = random.randrange(c.width)
        y = random.randrange(c.height)
        c.set_pixel(x, y, hex_color(random.choice(["#ecebe7", "#f7f6f3", "#e6e5e1"])))

    # Soft photographic tonal blocks.
    c.fill_ellipse(260, 250, 112, 134, "#d8d7d2")
    c.fill_ellipse(260, 234, 102, 122, "#cbc9c4")
    c.fill_ellipse(260, 250, 84, 108, "#e4e2dc")
    c.rect(170, 384, 180, 72, "#e7e5df")
    c.polyline([(116, 580), (166, 438), (226, 402), (296, 402), (356, 438), (405, 580)], "#c6c3bc", 32)
    c.polyline([(132, 582), (181, 462), (226, 421), (260, 442), (294, 421), (342, 462), (388, 582)], "#dbd8d1", 36)
    c.polyline([(178, 240), (199, 154), (258, 116), (328, 138), (361, 216), (351, 276)], "#565656", 18)
    c.line(213, 258, 243, 252, "#565656", 3)
    c.line(287, 252, 317, 258, "#565656", 3)
    c.polyline([(262, 267), (255, 305), (269, 315)], "#6b6b6b", 2)
    c.polyline([(226, 348), (258, 359), (296, 348)], "#5b5b5b", 3)
    c.border_rect(24, 24, 472, 592, "#e3e1dc", 2)
    c.save(PUBLIC / "about-photo.png")


def zeko_screenshot_main() -> None:
    c = Canvas(980, 640, "#050705")
    c.rect(0, 0, 980, 640, "#070807")
    c.rect(0, 0, 980, 44, "#0f1210")
    c.rect(22, 16, 12, 12, "#45c26b")
    c.rect(44, 16, 12, 12, "#6b6b6b")
    c.rect(66, 16, 12, 12, "#333333")
    c.rect(30, 82, 206, 500, "#0c100d")
    c.border_rect(30, 82, 206, 500, "#1f2a21", 1)
    for i in range(8):
        y = 120 + i * 44
        c.rect(58, y, 120 + (i % 3) * 18, 7, "#2de36e")
        c.rect(58, y + 18, 86, 5, "#234d31")
    c.border_rect(280, 82, 646, 438, "#1f2a21", 1)
    c.rect(281, 83, 644, 436, "#070907")
    for i in range(18):
        y = 118 + i * 20
        c.rect(318, y, 12, 4, "#265936")
        c.rect(344, y, 420 - (i % 5) * 52, 4, "#2de36e" if i % 4 == 0 else "#6f8d75")
    c.rect(318, 474, 314, 8, "#2de36e")
    c.rect(318, 494, 460, 5, "#345f3e")
    c.border_rect(280, 546, 646, 48, "#1f2a21", 1)
    c.rect(312, 566, 160, 6, "#2de36e")
    c.rect(486, 566, 260, 6, "#435947")
    c.save(PUBLIC / "zeko-os-main.png")


def zeko_screenshot_secondary() -> None:
    c = Canvas(980, 640, "#080908")
    c.rect(0, 0, 980, 640, "#0a0c0b")
    c.rect(0, 0, 980, 58, "#111411")
    c.rect(36, 22, 160, 8, "#2de36e")
    c.rect(742, 20, 172, 10, "#333e35")
    c.rect(36, 96, 272, 220, "#101410")
    c.border_rect(36, 96, 272, 220, "#253026", 1)
    c.rect(64, 132, 120, 8, "#2de36e")
    for i in range(5):
        c.rect(64, 170 + i * 24, 176 - i * 14, 7, "#49564b")
    c.rect(354, 96, 590, 220, "#101410")
    c.border_rect(354, 96, 590, 220, "#253026", 1)
    for i in range(7):
        c.rect(384, 132 + i * 23, 82, 6, "#2de36e" if i == 0 else "#49564b")
        c.rect(494, 132 + i * 23, 320 - i * 18, 6, "#4d5b50")
    c.rect(36, 358, 908, 214, "#101410")
    c.border_rect(36, 358, 908, 214, "#253026", 1)
    for i in range(9):
        c.rect(70, 400 + i * 17, 18, 5, "#2de36e")
        c.rect(106, 400 + i * 17, 480 - (i % 4) * 48, 5, "#718075")
    c.rect(686, 404, 204, 118, "#070907")
    c.border_rect(686, 404, 204, 118, "#253026", 1)
    c.rect(714, 438, 96, 8, "#2de36e")
    c.rect(714, 466, 132, 7, "#4d5b50")
    c.save(PUBLIC / "zeko-os-secondary.png")


if __name__ == "__main__":
    PUBLIC.mkdir(exist_ok=True)
    hero_portrait()
    about_photo()
    zeko_screenshot_main()
    zeko_screenshot_secondary()
    print("Generated portfolio placeholder assets in public/.")
