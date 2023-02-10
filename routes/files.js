const router=require('express').Router()
const formidable = require("formidable");
const path = require('path');
const fs = require('fs');
const { log } = require('console');
const { PDFNet } = require('@pdftron/pdfnet-node');

// const multer = require('multer');

// var storage = multer.diskStorage({

//   destination: function (req, file, cb) {

//     cb(null, '/uploads')
//   },


//   filename: function (req, file, cb) {

//     let filename = 'file';
//      req.body.file = filename

//     cb(null, filename)
//   }
// })
// // const upload = multer();
// var upload = multer({ storage: storage })


// const storage = multer.diskStorage({
//   destination: './uploads',
//   filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + 
//   path.extname(file.originalname));
//   }
// });


// const upload = multer({ dest: 'uploads/' });

router.get('/files', (req, res) => {
    const inputPath = path.resolve(__dirname, filesPath);
    fs.readdir(inputPath, function (err, files) {
      if (err) {
        return console.log('Unable to scan directory: ' + err);
      }
      res.setHeader('Content-type', mimeType['.json']);
      res.end(JSON.stringify(files));
    });
  });


router.post('/convert',(req,res)=>{
  console.log('Received convvert');

  const uploadFolder = path.join(__dirname, "public");
  console.log();

  let filepath

  const form = formidable({ multiples: true ,uploadDir :uploadFolder});
  form.on('file', function(field, file) {
    //rename the incoming file to the file's name
      fs.rename(file.filepath, form.uploadDir + "/" + file.originalFilename,()=>{
        filepath=form.uploadDir + "/" + file.originalFilename
        console.log(filepath);
        console.log(`Renamed to ${file.originalFilename}`);
        // convert(filepath)
      });
  });
  form.on('error', function(err) {
      console.log("an error has occured with form upload");
      console.log(err);
      req.resume();
  });

  form.on('aborted', function(err) {
      console.log("user aborted upload");
  });
  form.on('end', function() {
      console.log('-> upload done');
  });

  form.parse(req, (err, fields, files) => {
    if(err){
      console.log(err);

    }else{
      console.log('File uploaded');
      // console.log(typeof(files.file));

    }
  })

  res.json({sent:'received'})
  // let man=JSON.parse(req.file)

  // console.log(req.body);
  // console.log(req.file);
  
  // let form = new IncomingForm()

  // console.log(form);
  // form.uploadDir = 'uploads'

  // let men=form.parse()
  // console.log(men);
 


  // form.parse(req, function(err, fields, files) {
  //   console.log('Running parse');
  //   if (err) {
  //     console.log('some error', err)
  //   } else if (!files.file) {
  //     console.log('no file received')
  //   } else {
  //     var file = files.file
  //     console.log('saved file to', file.path)
  //     console.log('original name', file.name)
  //     console.log('type', file.type)
  //     console.log('size', file.size)
  //   }
  // })
})

const convert=async(filepath)=>{
  const inputPath = path.resolve(filepath);
  let blk=filepath.split('.')[0]
  const outputPath = path.resolve(`${blk}.pdf`);
  let filename=path.basename(outputPath)

  console.log(inputPath,outputPath);

  console.log('Here works');
  
  const pdfdoc = await PDFNet.PDFDoc.create();
  console.log('Here too');
  await pdfdoc.initSecurityHandler();
  await PDFNet.Convert.toPdf(pdfdoc, inputPath);

  pdfdoc.save(
    `${filename}`,
    PDFNet.SDFDoc.SaveOptions.e_linearized,
  );
}

  router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    let ext = path.parse(filename).ext;
  
    const inputPath = path.resolve(__dirname, filesPath, filename);
    const outputPath = path.resolve(__dirname, filesPath, `${filename}.pdf`);
  
    if (ext === '.pdf') {
      res.statusCode = 500;
      res.end(`File is already PDF.`);
    }
  
    const main = async () => {
      const pdfdoc = await PDFNet.PDFDoc.create();
      await pdfdoc.initSecurityHandler();
      await PDFNet.Convert.toPdf(pdfdoc, inputPath);
      pdfdoc.save(
        `${pathname}${filename}.pdf`,
        PDFNet.SDFDoc.SaveOptions.e_linearized,
      );
      ext = '.pdf';
    };
  
    PDFNetEndpoint(main, outputPath, res);
  });


module.exports=router