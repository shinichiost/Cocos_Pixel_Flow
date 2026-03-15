const fs = require("fs");
const path = require("path");

module.exports = {

    methods: {

        exportLevel(data, fileName) {

            try {
                const projectPath = Editor.Project.path;

                const folder = path.join(
                    projectPath,
                    "assets/resources/levels"
                );

                console.log("Creating folder:", folder);

                if (!fs.existsSync(folder)) {
                    fs.mkdirSync(folder, { recursive: true });
                    console.log("Folder created");
                }

                const file = path.join(folder, fileName + ".json");

                console.log("Writing file:", file);

                fs.writeFileSync(
                    file,
                    JSON.stringify(data, null, 2)
                );

                console.log("Level saved:", file);

                Editor.Message.request(
                    "asset-db",
                    "refresh-asset",
                    "db://assets/resources/levels"
                );

                console.log("Asset refresh requested");

            } catch (error) {
                console.error("Error in exportLevel:", error);
            }
        }

    }

};