Add-Type -AssemblyName System.Drawing
Add-Type -AssemblyName System.Windows.Forms

$outDir = Join-Path (Resolve-Path ".").Path "img\News"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

function New-Brush([string]$hex) {
    return New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml($hex))
}

function New-Pen([string]$hex, [float]$width = 3) {
    return New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml($hex)), $width
}

function Fill-RoundRect($g, $brush, [float]$x, [float]$y, [float]$w, [float]$h, [float]$r) {
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc($x, $y, $d, $d, 180, 90)
    $path.AddArc($x + $w - $d, $y, $d, $d, 270, 90)
    $path.AddArc($x + $w - $d, $y + $h - $d, $d, $d, 0, 90)
    $path.AddArc($x, $y + $h - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $g.FillPath($brush, $path)
    $path.Dispose()
}

function Draw-Player($g, [int]$x, [int]$y, [string]$shirt, [float]$scale = 1.0) {
    $skin = New-Brush "#d7a16f"
    $kit = New-Brush $shirt
    $dark = New-Brush "#101218"
    $g.FillEllipse($skin, $x + 18*$scale, $y, 34*$scale, 34*$scale)
    Fill-RoundRect $g $kit ($x + 7*$scale) ($y + 33*$scale) (56*$scale) (70*$scale) (10*$scale)
    $g.FillRectangle($dark, $x + 15*$scale, $y + 100*$scale, 13*$scale, 50*$scale)
    $g.FillRectangle($dark, $x + 42*$scale, $y + 100*$scale, 13*$scale, 50*$scale)
    $skin.Dispose(); $kit.Dispose(); $dark.Dispose()
}

function Draw-Ball($g, [int]$x, [int]$y, [int]$s) {
    $white = New-Brush "#f4f5f7"
    $dark = New-Brush "#121318"
    $g.FillEllipse($white, $x, $y, $s, $s)
    $g.FillPolygon($dark, [System.Drawing.Point[]]@(
        [System.Drawing.Point]::new($x + $s/2, $y + $s/4),
        [System.Drawing.Point]::new($x + $s*0.68, $y + $s/2),
        [System.Drawing.Point]::new($x + $s/2, $y + $s*0.72),
        [System.Drawing.Point]::new($x + $s*0.32, $y + $s/2)
    ))
    $white.Dispose(); $dark.Dispose()
}

function New-NewsImage([string]$file, [string]$theme, [string]$accent, [string]$accent2) {
    $bmp = New-Object System.Drawing.Bitmap 960, 540
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $bg = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        [System.Drawing.Rectangle]::new(0,0,960,540),
        [System.Drawing.ColorTranslator]::FromHtml("#121318"),
        [System.Drawing.ColorTranslator]::FromHtml("#242833"),
        45
    )
    $g.FillRectangle($bg, 0, 0, 960, 540)
    $gold = New-Brush "#ffd700"
    $muted = New-Brush "#303540"
    $a = New-Brush $accent
    $b = New-Brush $accent2
    $white = New-Brush "#f5f2e9"

    $g.FillRectangle($muted, 0, 390, 960, 150)
    $g.FillRectangle($gold, 0, 388, 960, 5)

    switch ($theme) {
        "squad-unity" {
            Draw-Player $g 230 160 $accent 1.1; Draw-Player $g 430 130 $accent2 1.25; Draw-Player $g 620 165 "#4c8cff" 1.05
            Fill-RoundRect $g $gold 250 325 460 44 20
        }
        "family-balance" {
            Draw-Player $g 280 150 $accent 1.2
            $g.FillEllipse($b, 560, 170, 90, 90); $g.FillRectangle($b, 580, 255, 50, 95)
            $g.FillEllipse($gold, 655, 215, 60, 60)
        }
        "maintenance" {
            Fill-RoundRect $g $a 255 190 450 170 18
            $g.FillRectangle($white, 310, 245, 340, 45)
            $g.FillRectangle($gold, 330, 305, 300, 20)
            $g.FillEllipse($b, 210, 130, 90, 90)
        }
        "decisive-week" {
            Draw-Player $g 380 140 $accent 1.25
            Draw-Ball $g 540 310 70
            $g.FillRectangle($gold, 140, 110, 690, 18)
            $g.FillRectangle($gold, 140, 150, 520, 18)
        }
        "training-attitude" {
            Draw-Player $g 300 125 $accent 1.25; Draw-Player $g 520 150 $accent2 1.1
            Draw-Ball $g 445 340 58
            $g.FillRectangle($gold, 120, 405, 720, 8)
        }
        "fan-social" {
            Draw-Player $g 390 155 $accent 1.15
            0..4 | ForEach-Object { Fill-RoundRect $g $b (130 + $_*135) 105 80 115 16 }
            $g.FillEllipse($gold, 650, 120, 42, 42)
        }
        "tactical-analysis" {
            Fill-RoundRect $g $a 210 120 540 260 20
            $g.FillEllipse($gold, 330, 215, 34, 34); $g.FillEllipse($white, 520, 260, 34, 34)
            $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#ffd700")), 6
            $g.DrawBezier($pen, 350,235,430,145,520,180,575,275)
            $pen.Dispose()
        }
        "scouts" {
            Draw-Player $g 435 155 $accent 1.2
            Fill-RoundRect $g $b 145 120 180 250 18; Fill-RoundRect $g $b 635 120 180 250 18
            $g.FillEllipse($gold, 190, 170, 55, 55); $g.FillEllipse($gold, 685, 170, 55, 55)
        }
        "fan-praise" {
            Draw-Player $g 420 135 $accent 1.15
            0..5 | ForEach-Object { $g.FillEllipse($b, 110 + $_*125, 270 + (($_ % 2)*35), 60, 60) }
            $g.FillEllipse($gold, 520, 135, 65, 65)
        }
        "teammate-help" {
            Draw-Player $g 330 150 $accent 1.15; Draw-Player $g 520 150 $accent2 1.15
            $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#ffd700")), 12
            $g.DrawLine($pen, 410, 245, 535, 245); $pen.Dispose()
        }
        "coach-video" {
            Draw-Player $g 250 175 $accent 1.0
            Fill-RoundRect $g $a 450 120 330 215 16
            Draw-Ball $g 585 205 62
            $g.FillRectangle($gold, 500, 365, 230, 12)
        }
        "sponsorship" {
            Draw-Player $g 380 140 $accent 1.15
            Fill-RoundRect $g $gold 535 160 240 130 18
            $g.FillEllipse($b, 585, 195, 70, 70)
        }
        "starter-claim" {
            Draw-Player $g 420 130 $accent 1.25
            $g.FillRectangle($gold, 170, 110, 170, 270)
            $g.FillRectangle($b, 620, 110, 170, 270)
        }
        "supercar" {
            Fill-RoundRect $g $a 205 260 560 100 42
            $g.FillEllipse($muted, 275, 325, 82, 82); $g.FillEllipse($muted, 610, 325, 82, 82)
            Draw-Player $g 440 90 $accent2 0.85
        }
        "house-squad" {
            $g.FillRectangle($a, 220, 190, 520, 190)
            $g.FillPolygon($b, [System.Drawing.Point[]]@([System.Drawing.Point]::new(180,190),[System.Drawing.Point]::new(480,95),[System.Drawing.Point]::new(780,190)))
            Draw-Player $g 345 270 "#4c8cff" 0.72; Draw-Player $g 475 270 $accent 0.72; Draw-Player $g 600 270 $accent2 0.72
        }
        "locker-calm" {
            Draw-Player $g 360 150 $accent 1.1; Draw-Player $g 520 155 $accent2 1.05
            Fill-RoundRect $g $muted 165 115 130 265 12; Fill-RoundRect $g $muted 680 115 130 265 12
            $g.FillEllipse($gold, 445, 105, 58, 58)
        }
        "maintenance-problem" {
            Fill-RoundRect $g $a 250 200 430 150 18
            $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml("#ffd700")), 12
            $g.DrawLine($pen, 330, 185, 635, 370); $g.DrawLine($pen, 635, 185, 330, 370); $pen.Dispose()
        }
        "cat-photo" {
            Draw-Player $g 315 140 $accent 1.05
            $g.FillEllipse($muted, 520, 245, 135, 105); $g.FillEllipse($muted, 615, 205, 75, 75)
            $g.FillEllipse($gold, 638, 230, 10, 10); $g.FillEllipse($gold, 666, 230, 10, 10)
        }
    }

    $g.FillRectangle($gold, 0, 0, 960, 10)
    $g.FillRectangle($gold, 0, 530, 960, 10)
    $path = Join-Path $outDir $file
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $g.Dispose(); $bmp.Dispose(); $bg.Dispose(); $gold.Dispose(); $muted.Dispose(); $a.Dispose(); $b.Dispose(); $white.Dispose()
}

$items = @(
    @("squad-unity.png", "squad-unity", "#3f7cff", "#e95656"),
    @("family-balance.png", "family-balance", "#3f7cff", "#e95656"),
    @("organized-routine.png", "maintenance", "#d89b28", "#5cbf6a"),
    @("decisive-week.png", "decisive-week", "#3f7cff", "#e95656"),
    @("training-attitude.png", "training-attitude", "#3f7cff", "#5cbf6a"),
    @("fan-social-debate.png", "fan-social", "#3f7cff", "#6f7688"),
    @("tactical-analysis.png", "tactical-analysis", "#2e6b4f", "#e95656"),
    @("scouts-market.png", "scouts", "#3f7cff", "#303540"),
    @("fan-praise.png", "fan-praise", "#3f7cff", "#6f7688"),
    @("teammate-help.png", "teammate-help", "#3f7cff", "#e95656"),
    @("coach-video-session.png", "coach-video", "#3f7cff", "#2e6b4f"),
    @("cat-photo.png", "cat-photo", "#3f7cff", "#101218"),
    @("sponsorship-deal.png", "sponsorship", "#3f7cff", "#e95656"),
    @("starter-claim.png", "starter-claim", "#3f7cff", "#e95656"),
    @("supercar-training.png", "supercar", "#e95656", "#3f7cff"),
    @("squad-house.png", "house-squad", "#d89b28", "#6f7688"),
    @("locker-room-calm.png", "locker-calm", "#3f7cff", "#5cbf6a"),
    @("maintenance-problem.png", "maintenance-problem", "#d89b28", "#e95656")
)

foreach ($item in $items) {
    New-NewsImage $item[0] $item[1] $item[2] $item[3]
}

$test = Join-Path $outDir "test.png"
if (Test-Path $test) {
    Remove-Item -LiteralPath $test
}
