import path from 'path';

const BLOCK_WIDTH = 1200 / 4;

export = {
  meta: {
    image: {
      type: 'file',
      path: path.resolve(__dirname, 'AB_richmenu_C.png'),
    },
  },
  richmenu: {
    size: {
      width: 2500,
      height: 843
    },
    selected: true,
    name: "Controller",
    chatBarText: "幫你找直播！",
    areas: [
      {
        bounds: {
          x: 0,
          y: 0,
          width: 625,
          height: 843
        },
        action: {
          type: "message",
          text: "follow"
        }
      },
      {
        bounds: {
          x: 625,
          y: 0,
          width: 625,
          height: 843
        },
        action: {
          type: "message",
          text: "top"
        }
      },
      {
        bounds: {
          x: 1250,
          y: 0,
          width: 625,
          height: 843
        },
        action: {
          type: "message",
          text: "help"
        }
      },
      {
        bounds: {
          x: 1875,
          y: 0,
          width: 625,
          height: 843
        },
        action: {
          type: "uri",
          uri: "https://liff.line.me/1653917374-QqknRPqk"
        }
      }
    ]
  }
};
