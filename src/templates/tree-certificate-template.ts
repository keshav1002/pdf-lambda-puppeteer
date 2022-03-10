import * as handlebars from "handlebars";

const html: string = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>PDF</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
      body{
          margin: 0;
          padding: 0;
          font-family: 'Montserrat', sans-serif;
      }
      .container{
          width: 1170px;
          margin: auto;
      }
      .banner{
          background-image: url('{{treeImage}}');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          background-position: center;
          width: 100%;
          height: 370px;
          position: relative;
          z-index: 999;
      }
      .memory{
          background-image: url('https://cdn.floristone.com/tree-certificate/linen.png');
          background-repeat:repeat;
          background-position: center;
          padding-top: 50px;
          padding-bottom:25px;
          width: 100%;
          min-height: 450px;
          margin-top: -58px;
      }
      .memory h1{
          color: #264333;
          font-size: 50px;
          font-weight: 300;
          margin-bottom: 0;
          margin-top: 0;
      }
      .memory h3{
          color: #030403;
          font-size: 22px;
          font-weight: 400;
          margin-bottom: 5px;
      }
      .divider {
          width: 460px;
          height: 1px;
          background-color: #9B9A65;
          margin: auto;
      }
      .inner{
          padding-top: 10px;
      }
      .inner h2{
          display: inline-block;
          margin-top: 0px;
          color: #040404;
          font-size: 30px;
          font-weight: 500;
          margin-bottom: 20px;
      }
      .inner img{
          height: 34px;
          margin-left: 50px;
          margin-right: 50px;
          position: relative;
          top: 2px;
      }
      .rectangle{
          background-image: url('https://cdn.floristone.com/tree-certificate/rectangle.png');
          background-repeat: no-repeat;
          padding-top: 8px;
          padding-bottom: 5px;
          margin: auto;
          width: 573px;
          background-size: 100% 100%;
          margin-top: 5px;
      }
      .rectangle h4{
          color: #fff;
          font-size: 25px;
          font-weight: 500;
          margin-top: 25px;
          line-height: 0;
      }
      .memory h5{
          color: #0A0D07;
          font-size: 22px;
          font-weight: 400;
          margin-bottom: 2px;
          margin-top: 20px;
      }
      .memory h6{
          color: #0F110C;
          font-size: 24px;
          margin-top: 0;
          font-weight: 500;
          margin-bottom: 25px;
      }
      .align{
          text-align: center;
      }
      .divider-two{
          width: 137px;
          height: 1px;
          background-color: #9B9A65;
          margin: auto;
      }
      .down{
          text-align: center;
          padding-top: 10px;
      }
      .down h4{
          margin-bottom: 6px;
          margin-top: 8px;
          font-size: 16px;
          font-weight: 600;
          color: #2C3524;
      }
      .float-one{
          float: left;
          width: 20%;
      }
      .float-two{
          float: left;
          width: 60%;
      }
      .float-three{
          width: 20%;
          float: left;
      }
      .float-three img{
          height: 50px;
      }
      .down h2{
          font-size: 20px;
          margin-top: 20px;
          color: #2C3524;
      }
      .footer h4{
          color: #EBE3DD;
          text-align: center;
          margin-top: 10px;
          margin-bottom: 10px;
      }
      .footer{
          background: linear-gradient(#705339,#77573C );
          padding-bottom: 5px;
          padding-top: 5px;
          font-size: 18px;
          font-weight: 400;
      }
    </style>
</head>
<body>
    <div class="banner">
     <div class="container">

     </div><!--container-->
    </div><!--banner-->

    <div class="memory">
     <div class="container">
         <div class="align">
       <h1>Memorial Tree Certificate</h1>
       <h3>In loving memory of:</h3>
       <div class="divider">
    </div>
    <div class="inner">
     <img src="https://cdn.floristone.com/tree-certificate/tree-Icon.png" alt="">  <h2>{{recipientName}}</h2>
     <img src="https://cdn.floristone.com/tree-certificate/tree-Icon.png" alt="">
    </div><!--inner-->

    <div class="divider">
    </div>

    <div class="rectangle">
      <h4>{{numberOfTrees}}</h4>

    </div><!--rectangle-->
       <h5>Courtesy of:</h5>
       <h6>{{senderName}}</h6>
       </div>
     </div><!--container-->
     <div class="down">
        <div class="container">

          <div class="float-one">
           <h4>{{dateOfCertificate}}</h4>
           <div class="divider-two">
        </div>
           <h4> Date</h4>

          </div>

          <div class="float-two">
           <h2>{{partnerString}}</h2>
          </div>

          <div class="float-three">
              <img src="{{partnerLogo}}" alt="">
          </div>
          <div style="clear: both;"></div>

        </div><!--container-->
       </div><!--down-->
    </div><!--memory-->


    <div class="footer">
      <div class="container">
        <h4>Your trees improve air and water quality, resrtore natural habitats, and cool earth</h4>
      </div><!--container-->
    </div><!--footer-->



</body>
</html>
`;

console.log(html);

export const getTreeCertificateTemplate: any = (context: any) => {
  return handlebars.compile(html)(context);
};
