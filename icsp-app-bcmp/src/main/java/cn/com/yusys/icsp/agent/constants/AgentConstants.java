package cn.com.yusys.icsp.agent.constants;


public class AgentConstants
{
    public static final String AGENT = "Agent";
    public static final String SUCCESS_CODE = "0";
    public static final String DEFAULT_AGENT_SERVER_FILE_DIR = "/home/agent/app";
    public static final int KB = 1024;
    public static final int M = 1048576;
    public static final String AGENT_VERSION = "Agent_1.0.0";
    public static final String APPLICATION_MXBEAN_NAME = "Agent:name=ApplicationManagement";
    public static final String AGENT_MXBEAN_NAME = "Agent:name=AgentManagement";
    public static final String HTMLADAPTER_MXBEAN_NAME = "Agent:name=htmladapter";
    public static final String DEFAULT_RMI_PORT = "1099";
    public static final int DEFAULT_NETTY_PORT = 8085;
    public static final int DEFAULT_HTML_PORT = 8082;
    public static final String RMI_PORT_STATUS_KEY = "rmiStatus";
    public static final String SOCKET_PORT_STATUS_KEY = "socketStatus";
    public static final String AGENT_SERVER_STATUS_KEY = "agentStatus";
    public static final String DEFAULT_AGENT_REGISTRY_ADDRESS = "127.0.0.1:8100";
    public static final int DEFAULT_FILE_SPLIT_SIZE = 15728640;
    public static final String DEFAULT_FILE_SPLIT_SUFFIX = ".part";
    public static final String TRANSFER_TYPE_READYING = "readying";
    public static final String TRANSFER_TYPE_TRANSFERRING = "transferring";
    public static final String TRANSFER_TYPE_ENDING = "ending";
    public static final String TRANSFER_MESSAGE_READY_COMPLATE = "ready complete";
    public static final String TRANSFER_MESSAGE_WRITE_COMPLATE = "write complete";
    public static final String TRANSFER_MESSAGE_END_COMPLATE = "end complete";
}
