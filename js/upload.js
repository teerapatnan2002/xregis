/**
 * Created by aem on 11/8/2016 AD.
 */
"use strict";

var Upload = (function () {
  function Upload() {
    this.path = {
      user: {
        // getUrl: serverApiUrl + "media/user/",
        uploadUrl: "/api/media/user/upload"
      },
      doc: {
        // getUrl: serverApiUrl + "media/user/",
        uploadUrl: "/api/media/doc/upload"
      },
      docFinan: {
        // getUrl: serverApiUrl + "media/user/",
        uploadUrl: "/api/media/docfinan/upload"
      },
      docTemp: {
        // getUrl: serverApiUrl + "media/user/",
        uploadUrl: "/api/media/doctemp/upload"
      },
      externalTransfer: {
        uploadUrl: "/api/media/student_external_transfer/upload"
      },
      studentDocument: {
        uploadUrl: "/api/media/student_document/upload"
      },
    };

    this.config = {
      imageValidation: [".gif", ".jpg", ".jpeg", ".png"],
      documentValidation: [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".csv"],
      studentDocumentValidation: [".pdf", ".jpg", ".jpeg", ".png"],
      excelValidation: [".xls", ".xlsx", ".csv"],
      autoUpload: true,
      maxFileSize: 2597152 // 2.5mb
    };

    this.pathViewFilw = {
      externalTransfer: "/external_transfer",     // + /{filename}
      studentDocument: "/student_document",      // + /{StudentId}/{filename}
      studentCompensation: "/student_compensation",      // + /{filename}
    }
  }

  return Upload;
}());
