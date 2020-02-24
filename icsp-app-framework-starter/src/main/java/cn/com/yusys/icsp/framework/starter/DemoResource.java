package cn.com.yusys.icsp.framework.starter;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo")
public class DemoResource {
    /**
     * 接受GET请求/api/demo/hello.
     * 
     */
    @GetMapping("/hello")
    public String getName() {
        return "统一服务平台：HelloWord";
    }
    /**
     * 接受GET请求/api/demo/name. 其中接受请求参数为url后面拼接的参数
     * 
     * <pre>
     * /api/demo/name?name=test
     * </pre>
     */
    @GetMapping("/name")
    public String getName(String name) {
        return "RequestParam:" + name;
    }
    /**
     * 接受POST请求/api/demo/name. 
     * {@code @RequestBody} 接受请求体中的数据 {@code @PostMapping}
     * 匹配http的POST请求
     *
     * @param name
     * @return
     */
    @PostMapping("/name")
    public String addName(@RequestBody String name) {
        return "RequestBody:" + name;
    }
    /**
     * 使用@PathVariable获取路径参数
     *
     * @param name
     * @return
     */
    @GetMapping("/names/{name}")
    public String getPathVariableName(@PathVariable("name") String name) {
        return "PathVariable" + name;
    }
}