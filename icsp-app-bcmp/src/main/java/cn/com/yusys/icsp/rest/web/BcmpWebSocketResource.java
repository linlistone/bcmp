package cn.com.yusys.icsp.rest.web;


import cn.com.yusys.icsp.base.web.rest.dto.ResultDto;
import cn.com.yusys.icsp.bcmp.BcmpTools;
import cn.com.yusys.icsp.bcmp.HostDescriptor;
import cn.com.yusys.icsp.bcmp.ShellScriptManager;
import cn.com.yusys.icsp.common.mapper.QueryModel;
import cn.com.yusys.icsp.domain.BcmpSmNodeinfo;
import cn.com.yusys.icsp.service.BcmpSmNodeinfoService;
import cn.com.yusys.icsp.service.BcmpWebSocketService;
import com.alibaba.fastjson.JSONObject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


/**
 * @author linli
 * @version 1.0
 * @date 16:26 2020/3/1
 * @fun
 */
@RestController
@RequestMapping("/node/websocket")
public class BcmpWebSocketResource {

    private Logger log = LoggerFactory.getLogger(BcmpWebSocketResource.class);

    @Autowired
    private BcmpWebSocketService bcmpWebSocketService;

    @Autowired
    private BcmpSmNodeinfoService bcmpSmNodeinfoService;

    //agent 端口
    private String agentPort = "1099";

    /**
     * @方法名称: create
     * @方法描述: 新增节点信息表
     * @参数与返回说明:
     * @算法描述:
     */
    @PostMapping(value = "/getNodesStat")
    public ResultDto<String> getNodesStat() throws Exception {
        new Thread(() -> {
            try {
                List<BcmpSmNodeinfo> bcmpSmNodeinfos = bcmpSmNodeinfoService.selectAll(new QueryModel());

                JSONObject nodeGroup = new JSONObject();

                for (int i = 0; i < bcmpSmNodeinfos.size()  ; i++) {
                    BcmpSmNodeinfo bcmpSmNodeinfo = bcmpSmNodeinfos.get(i);

                    if(!"192.168.58.111".equals(bcmpSmNodeinfo.getHostIp())){
                        continue;
                    }
                    HostDescriptor hostDescriptor = new HostDescriptor(bcmpSmNodeinfo.getHostIp(), "", "", agentPort);

                    String cmd = ShellScriptManager.getScript(hostDescriptor.getOsName(),"checkServerState.sh",bcmpSmNodeinfo.getHttpPort());

                    String ret= BcmpTools.goCmd(hostDescriptor,cmd).replaceAll("\r|\n","");

                    nodeGroup.put(bcmpSmNodeinfo.getHostIp(),ret);
                    //System.out.println("查看读取文本的结果 :"+cmd);
                }

                bcmpWebSocketService.GroupSending(nodeGroup.toJSONString());
            } catch (Exception e) {
                e.printStackTrace();
            }
            //return;
        }).start();
        return ResultDto.success("请求成功");
    }

    ///**
    // * 与某个客户端的连接对话，需要通过它来给客户端发送消息
    // */
    //private Session session;
    //
    ///**
    // * 标识当前连接客户端的用户名
    // */
    //private String name;
    //
    ///**
    // * 用于存所有的连接服务的客户端，这个对象存储是安全的
    // */
    //private static ConcurrentHashMap<String, BcmpWebSocketResource> webSocketSet = new ConcurrentHashMap<>();
    //
    //
    //@OnOpen
    //public void OnOpen(Session session, @PathParam(value = "name") String name) {
    //    this.session = session;
    //    this.name = name;
    //    // name是用来表示唯一客户端，如果需要指定发送，需要指定发送通过name来区分
    //    webSocketSet.put(name, this);
    //    log.info("[WebSocket] 连接成功，当前连接客户端数为：={}", webSocketSet.size());
    //}
    //
    //
    //@OnClose
    //public void OnClose() {
    //    webSocketSet.remove(this.name);
    //    log.info("[WebSocket] 退出成功，当前连接客户端数为：={}", webSocketSet.size());
    //}
    //
    //@OnMessage
    //public void OnMessage(String message) {
    //    log.info("[WebSocket] 收到消息：{}", message);
    //    //判断是否需要指定发送，具体规则自定义
    //    if (message.indexOf("TOUSER") == 0) {
    //        String name = message.substring(message.indexOf("TOUSER") + 6, message.indexOf(";"));
    //        AppointSending(name, message.substring(message.indexOf(";") + 1, message.length()));
    //    } else {
    //        GroupSending(message);
    //    }
    //
    //}
    //
    ///**
    // * 群发
    // *
    // * @param message
    // */
    //public void GroupSending(String message) {
    //    for (String name : webSocketSet.keySet()) {
    //        try {
    //            webSocketSet.get(name).session.getBasicRemote().sendText(message);
    //        } catch (Exception e) {
    //            log.error("群发消息到【" + name + "】异常", e);
    //        }
    //    }
    //}
    //
    ///**
    // * 指定发送
    // *
    // * @param name
    // * @param message
    // */
    //public void AppointSending(String name, String message) {
    //    try {
    //        webSocketSet.get(name).session.getBasicRemote().sendText(message);
    //    } catch (Exception e) {
    //        log.error("发送消息到【" + name + "】异常", e);
    //    }
    //}
}