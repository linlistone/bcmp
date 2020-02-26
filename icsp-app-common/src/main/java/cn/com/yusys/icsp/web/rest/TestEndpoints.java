package cn.com.yusys.icsp.web.rest;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;

/**
 * @author 徐靖峰
 * Date 2018-04-19
 */
@Api
@RestController
@RequestMapping("/api")
public class TestEndpoints {

    @ApiOperation(value = "接口的功能介绍1",notes = "提示接口使用者注意事项",httpMethod = "GET")
    @ApiImplicitParam(dataType = "string",name = "name",value = "姓名",required = true)
    @GetMapping("/product/{id}")
    public String getApi(@PathVariable String id) {
        return "getApi id : " + id;
    }
    @ApiOperation(value = "接口的功能介绍2",notes = "提示接口使用者注意事项",httpMethod = "POST")
    @ApiImplicitParam(dataType = "string",name = "name",value = "姓名",required = true)
    @PostMapping("/order/{id}")
    public String postApi(@RequestBody String id ){
        return "postApi id : " + id;
    }

}
