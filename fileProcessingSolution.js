const {generateSampleFiles, findFilesToProcess} = require("./fileProcessing/fileProcessor");

generateSampleFiles("test",10).then((res) => {
    console.log("Created sample files", res);
}).catch(e => {
    console.error("Failed to create sample files", e)
});

findFilesToProcess(["test1.txt", "test2.txt", "test1.txt", "test2.txt"], 0).then((r) => {
    console.log(r)
});
