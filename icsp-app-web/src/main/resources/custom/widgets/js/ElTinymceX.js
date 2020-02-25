/**
 * 富文本
 */
(function (vue, $, name) {
  vue.component(name, {
    template: '<textarea class="tinymce-textarea" :id="id" :action="action"></textarea>',
    name: 'tinymce',
    props: {
      busNo: String,
      action: String,
      disabled: Boolean,
      value: {
        type: String,
        default: ''
      },
      id: String,
      toolbar: {
        type: Array,
        default: function () {
          return [
            'removeformat undo redo |  bullist numlist | outdent indent | forecolor | fullscreen code',
            'bold italic blockquote | h2 p | image media link | alignleft aligncenter alignright | table'
          ];
        }
      },
      menubar: {
        default: ''
      },
      height: {
        type: Number,
        required: false,
        default: 360
      }
    },
    data: function () {
      return {
        hasChange: false,
        hasInit: false,
        // 保存上传文件对象
        filedata: [],
        // 富文本编辑前内容
        content: ''
      };
    },
    watch: {
      value: function (val) {
        if (!this.hasChange && this.hasInit) {
          this.$nextTick(function () {
            window.tinymce.get(this.id).setContent(val);
          });
        }
      }
    },
    mounted: function () {
      var _this = this;
      window.tinymce.init({
        selector: 'textarea#' + _this.id,
        height: _this.height,
        body_class: 'panel-body',
        object_resizing: false,
        toolbar: _this.toolbar,
        menubar: _this.menubar,
        language: 'zh_CN',
        plugins:
            'advlist,autolink,code,paste,textcolor, colorpicker,fullscreen,link,lists,media,wordcount,image,imagetools,table',
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        block_formats: '普通标签=p;小标题=h2;',
        imagetools_cors_hosts: [
          'wpimg.wallstcn.com',
          'wallstreetcn.com'
        ],
        media_live_embeds: true,
        imagetools_toolbar: 'watermark',
        default_link_target: '_blank',
        link_title: false,
        images_upload_url: _this.action,
        image_title: true,
        file_picker_types: 'file image media',
        //   audio_template_callback: function(data) {
        //     return '<audio controls>' + '\n<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + '</audio>';
        //   },
        //   video_template_callback: function(data) {
        //     return '<video width="' + data.width + '" height="' + data.height + '"' + (data.poster ? ' poster="' + data.poster + '"' : '') + ' controls="controls">\n' + '<source src="' + data.source1 + '"' + (data.source1mime ? ' type="' + data.source1mime + '"' : '') + ' />\n' + (data.source2 ? '<source src="' + data.source2 + '"' + (data.source2mime ? ' type="' + data.source2mime + '"' : '') + ' />\n' : '') + '</video>';
        //   },
        images_upload_handler: function (blobInfo, success, failure) {
          var formData;
          var xhr = null;
          if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
          } else if (window.ActiveXObject) {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
          } else {
            yufp.$message('你的浏览器不支持XMLHttp!', '提示');
            return;
          }
          xhr.withCredentials = false;
          var url = yufp.service.getUrl({ url: backend.adminService + _this.action });
          xhr.open('POST', url);
          xhr.setRequestHeader('Authorization', 'Bearer ' + yufp.service.getToken());
          xhr.setRequestHeader('busNo', _this.busNo);
          xhr.onload = function () {
            var json;

            if (xhr.status != 200) {
              failure('HTTP Error: ' + xhr.status);
              return;
            }

            json = JSON.parse(xhr.responseText);
            var file = {};
            var filePath = json.data.filePath;
            var fileId = json.data.fileId;
            file.fileId = fileId;
            file.filePath = filePath;
            _this.filedata.push(file);
            if (!json || typeof filePath != 'string') {
              failure('Invalid JSON: ' + xhr.responseText);
              return;
            }
            var path = 'http://' + backend.remote + '/' + json.data.filePath + '?' + 'pathtrs';
            success(path);
          };

          formData = new FormData();
          formData.append('file', blobInfo.blob(), blobInfo.filename());
          formData.append('busNo', _this.busNo);
          xhr.send(formData);
        },
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement('input');
          input.setAttribute('type', 'file');
          input.setAttribute('id', 'tinymceUpload');
          //          input.click();
          // input.setAttribute("accept", "image/*");
          document.body.appendChild(input);
          document.getElementById('tinymceUpload').click();
          input.onchange = function () {
            var file = this.files[0];
            var reader = new FileReader();
            reader.onload = function () {
              var id = 'blobid' + new Date().getTime();
              var blobCache =
                        tinymce.activeEditor.editorUpload.blobCache;
              var base64 = reader.result.split(',')[1];
              var blobInfo = blobCache.create(id, file, base64);
              blobCache.add(blobInfo);
              // call the callback and populate the Title field with the file name
              cb(blobInfo.blobUri(), { title: file.name });
            };
            reader.readAsDataURL(file);
            document.body.removeChild(input);
          };
        },
        init_instance_callback: function (editor) {
          if (_this.value) {
            editor.setContent(_this.value);
          }
          _this.hasInit = true;
          editor.on('Change KeyUp', function (event) {
            _this.hasChange = true;
            _this.$emit('input', editor.getContent({ format: 'raw' }));
            _this.content = editor.getContent({ format: 'raw' });
          });
          editor.on('KeyDown', function (event) {
            if (event.keyCode == '08') {
              // 匹配img标签
              var imgReg = /<img.*?(?:>|\/>)/gi;
              // 匹配src属性
              var srcReg = /src=['"]?([^'"]*)['"]?/i;
              var img = _this.content.match(imgReg);
              if (img !== null) {
                var imgArr = [];
                var removeImg = [];
                var curImg = event.target.innerHTML.match(imgReg) ? event.target.innerHTML.match(imgReg) : [];
                for (var i = 0; i < curImg.length; i++) {
                  for (var j = 0; j < img.length; j++) {
                    if (curImg[i] !== img[j]) {
                      imgArr.push(img[j]);
                    }
                  }
                }
                removeImg = img.length == 1 ? img : imgArr;
                var curSrc = removeImg[0].match(srcReg)[1];
                if (curSrc.indexOf('?') !== -1) {
                  var url = curSrc.replace(/^.*?\:\/\/[^\/]+/, '').slice(1);
                  var path = url.slice(0, url.indexOf('?'));
                  // 进行文件的删除
                  yufp.service.request({
                    url: backend.adminService + '/api/adminfileuploadinfo/deletericheditfile',
                    method: 'post',
                    data: JSON.stringify({
                      filePath: path
                    }),
                    callback: function (code, message, res) {
                      if (res != null && res) {
                        _this.$message('删除成功!', '提示');
                        yufp.logger.info('删除成功');
                      }
                    }
                  });
                }
              }
            }
          });
        },
        setup: function (editor) {
          editor.addButton('h2', {
            title: '小标题',
            text: '小标题',
            onclick: function () {
              editor.execCommand('mceToggleFormat', false, 'h2');
            },
            onPostRender: function () {
              var btn = this;
              editor.on('init', function () {
                editor.formatter.formatChanged('h2', function (state) {
                  btn.active(state);
                });
              });
            }
          });
          editor.addButton('p', {
            title: '正文',
            text: '正文',
            onclick: function () {
              editor.execCommand('mceToggleFormat', false, 'p');
            },
            onPostRender: function () {
              var btn = this;
              editor.on('init', function () {
                editor.formatter.formatChanged('p', function (state) {
                  btn.active(state);
                });
              });
            }
          });
        }
      });
    },
    destroyed: function () {
      window.tinymce.get(this.id).destroy();
    }
  });
}(Vue, yufp.$, 'el-tinymce-x'));