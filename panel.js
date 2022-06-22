// Eliminar todos los paneles
let all_panels = panels()
for (let panel of all_panels) {
    panel.remove()
}

// Eliminar todos los widgets
let all_desktops = desktops()
for (let desktop of all_desktops) {
    let all_widgets = desktop.widgets()
    for (let widget of all_widgets) {
        widget.remove()
    }
}

let panel = new Panel
let panelScreen = panel.screen
let freeEdges = { "bottom": true, "top": true, "left": true, "right": true }

for (i = 0; i < panelIds.length; ++i) {
    let tmpPanel = panelById(panelIds[i])
    if (tmpPanel.screen == panelScreen) {
        // Ignore the new panel
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
    // There is no free edge, so leave the default value
    panel.location = "top";
}
// For an Icons-Only Task Manager on the bottom, *3 is too much, *2 is too little
// Round down to next highest even number since the Panel size widget only displays
// even numbers
panel.height = 2 * Math.floor(gridUnit * 2.3 / 2)

// Restrict horizontal panel to a maximum size of a 21:9 monitor
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

let kickoff = panel.addWidget("org.kde.plasma.kickoff")
kickoff.currentConfigGroup = ["Shortcuts"]
kickoff.writeConfig("global", "Alt+F1")

// panel.addWidget("org.kde.plasma.showActivityManager")
panel.addWidget("org.kde.plasma.pager")
let icontaskts = panel.addWidget("org.kde.plasma.icontasks")
icontaskts.currentConfigGroup = ["General"]
icontaskts.writeConfig("launchers", [
    "applications:Alacritty.desktop",
    "applications:google-chrome.desktop",
    "applications:org.kde.dolphin.desktop"
])

panel.addWidget("org.kde.plasma.marginsseparator")
panel.addWidget("org.kde.plasma.systemtray")
panel.addWidget("org.kde.plasma.digitalclock")
panel.addWidget("org.kde.plasma.showdesktop")

