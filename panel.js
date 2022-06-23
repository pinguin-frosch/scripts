// Eliminar todos los paneles
let paneles = panels()
for (let panel of paneles) {
    panel.remove()
}

// Eliminar todos los widgets
let escritorios = desktops()
for (let escritorio of escritorios) {
    let widgets = escritorio.widgets()
    for (let widget of widgets) {
        widget.remove()
    }
}

let panel = new Panel
let panelScreen = panel.screen
let freeEdges = { "bottom": true, "top": true, "left": true, "right": true }

for (i = 0; i < panelIds.length; ++i) {
    let tmpPanel = panelById(panelIds[i])
    if (tmpPanel.screen == panelScreen) {
        if (tmpPanel.id != panel.id) {
            freeEdges[tmpPanel.location] = false;
        }
    }
}

if (freeEdges["bottom"] == true) {
    panel.location = "bottom";
} else if (freeEdges["top"] == true) {
    panel.location = "top";
} else if (freeEdges["left"] == true) {
    panel.location = "left";
} else if (freeEdges["right"] == true) {
    panel.location = "right";
} else {
    panel.location = "top";
}
panel.height = 2 * Math.floor(gridUnit * 2.3 / 2)

const maximumAspectRatio = 21 / 9;
if (panel.formFactor === "horizontal") {
    const geo = screenGeometry(panelScreen);
    const maximumWidth = Math.ceil(geo.height * maximumAspectRatio);

    if (geo.width > maximumWidth) {
        panel.alignment = "center";
        panel.minimumLength = maximumWidth;
        panel.maximumLength = maximumWidth;
    }
}

let menu_aplicaciones = panel.addWidget("org.kde.plasma.kickoff")
menu_aplicaciones.currentConfigGroup = ["Shortcuts"]
menu_aplicaciones.writeConfig("global", "Alt+F1")

panel.addWidget("org.kde.plasma.pager")
let barra_aplicaciones = panel.addWidget("org.kde.plasma.icontasks")
barra_aplicaciones.currentConfigGroup = ["General"]
barra_aplicaciones.writeConfig("launchers", [
    "applications:Alacritty.desktop",
    "applications:google-chrome.desktop",
    "applications:org.kde.dolphin.desktop"
])

panel.addWidget("org.kde.plasma.marginsseparator")
panel.addWidget("org.kde.plasma.systemtray")
reloj = panel.addWidget("org.kde.plasma.digitalclock")
reloj.currentConfigGroup = ["Appearance"]
reloj.writeConfig("showWeekNumbers", true)
panel.addWidget("org.kde.plasma.showdesktop")

