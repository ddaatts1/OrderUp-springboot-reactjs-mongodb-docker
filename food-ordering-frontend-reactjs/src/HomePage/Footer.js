import "./Footer.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebook, faInstagram} from '@fortawesome/free-brands-svg-icons'


function Footer() {


    return (
        <div className="footerContainer">
            <div className="footer">
                <div className="doc">
                    <span style={{fontWeight: "bold", fontSize: "large"}}>Công ty</span>
                    <ul>
                        <li><a href="#">Giới thiệu</a></li>
                        <li><a href="#">Trung tâm Trợ giúp</a></li>
                        <li><a href="#">Quy chế</a></li>
                        <li><a href="#">Điều khoản sử dụng</a></li>
                        <li><a href="#">Bảo mật thông tin</a></li>
                        <li><a href="#">Giải quyết khiếu nại</a></li>
                    </ul>
                </div>
                <div className="otherPlatform">
                    <span style={{fontWeight: "bold", fontSize: "large"}}>Ứng dụng OrderUp</span>

                    <div className="android"></div>
                    <div className="ios"></div>
                    <div className="gallery"></div>

                </div>
                <div className="social">
                    <div className="socialIcon">
                        <FontAwesomeIcon className="facebook" icon={faFacebook}/>
                        <FontAwesomeIcon className="facebook" icon={faInstagram}/>
                    </div>

                </div>
                <div className="address">
                    <span style={{marginBottom:"20px",fontWeight:"bold"}}>Địa chỉ công ty</span>

                        <span>Công Ty Cổ Phần Foody</span>
                        <span>Lầu G, Tòa nhà Jabes 1,</span>
                        <span>số 244 đường Cống Quỳnh, phường Phạm Ngũ Lão, Quận 1, TPHCM</span>
                        <span>Giấy CN ĐKDN số: 02932932</span>
                        <span>do Sở Kế hoạch và Đầu tư TP.HCM cấp ngày 11/6/2012,</span>
                        <span>sửa đổi lần thứ 23, ngày 10/12/2020</span>
                        {/*<br/>Chịu trách nhiệm quản lý nội dung: Do Tien Dat*/}
                        {/*Điện thoại liên hệ: 0998765467*/}


                </div>
            </div>
        </div>
    )
}

export default Footer;