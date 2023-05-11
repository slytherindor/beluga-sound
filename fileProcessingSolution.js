const {generateSampleFiles, findFilesToProcess} = require("./fileProcessing/fileProcessor");

async function run(){
    try {
        await generateSampleFiles("test",10).then((res) => {
            console.log("Created sample files", res);
        });
    } catch(e) {
        console.error("Failed to create sample files", e)
    };
    try {
        const result = await findFilesToProcess(["test1.txt", "test2.txt", "test3.txt", "test14.txt"], 0);
        console.log(result);
    } catch (e) {
        console.error("Failed to process files", e)
    }
}

void run();
