// ȫ�ֱ���a��b���ֱ��ȡ�û����������valueֵl;
var User = {
	usr : null,
	pwd : null,
};
//�û���ʧȥ�������֤valueֵ
function oBlur_1() {
	User.usr = document.getElementsByTagName("input")[0].value;
	mUser = User.usr;
    if (!User.usr) { //�û���valueֵΪ��
        document.getElementById("remind_1").innerHTML = "�������û�����";
        document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
    } else { //�û���valueֵ��Ϊ��
        document.getElementById("remind_1").innerHTML = "";
        document.getElementById("change_margin_1").style.marginBottom = 19 + "px";
		document.login.action = "index.html?user="+User.usr;
    }
}

//�����ʧȥ�������֤valueֵ
function oBlur_2() {
	//b = document.getElementsByTagName("input")[1].value;
	User.pwd = document.getElementsByTagName("input")[1].value;;
    if (!User.pwd) { //�����valueֵΪ��
        document.getElementById("remind_2").innerHTML = "���������룡";
        document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
        document.getElementById("change_margin_3").style.marginTop = 2 + "px";
    } else { //�����valueֵ��Ϊ��
        document.getElementById("remind_2").innerHTML = "";
        document.getElementById("change_margin_2").style.marginBottom = 19 + "px";
        document.getElementById("change_margin_3").style.marginTop = 19 + "px";
    }
}

//�û����ý������������
function oFocus_1() {
    document.getElementById("remind_1").innerHTML = "";
    document.getElementById("change_margin_1").style.marginBottom = 19 + "px";
}

//������ý������������
function oFocus_2() {
    document.getElementById("remind_2").innerHTML = "";
    document.getElementById("change_margin_2").style.marginBottom = 19 + "px";
    document.getElementById("change_margin_3").style.marginTop = 19 + "px";
}

//�������Ϊ�գ���ֹ�����ύ
function submitLog() {
    if (!User.usr && !User.pwd) { //�û���valueֵ�������valueֵ��Ϊ��
        document.getElementById("remind_1").innerHTML = "�������û�����";
        document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
        document.getElementById("remind_2").innerHTML = "���������룡";
        document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
        document.getElementById("change_margin_3").style.marginTop = 2 + "px";
        return false; //ֻ�з���true���Ż��ύ
    } else if (!User.usr) { //�û���valueֵΪ��
        document.getElementById("remind_1").innerHTML = "�������û�����";
        document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
        return false;
    } else if (!User.pwd) { //�����valueֵΪ��
        document.getElementById("remind_2").innerHTML = "���������룡";
        document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
        document.getElementById("change_margin_3").style.marginTop = 2 + "px";
        return false;
    }
	else{
		alert("��¼�ɹ�,׼��������Ϸ");
		document.login.action = "index.html?user="+User.usr;
		return true;
	}
}

function submitSign() {
    if (!User.usr && !User.pwd) { //�û���valueֵ�������valueֵ��Ϊ��
        document.getElementById("remind_1").innerHTML = "�������û�����";
        document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
        document.getElementById("remind_2").innerHTML = "���������룡";
        document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
        document.getElementById("change_margin_3").style.marginTop = 2 + "px";
        return false; //ֻ�з���true���Ż��ύ
    } else if (!User.usr) { //�û���valueֵΪ��
        document.getElementById("remind_1").innerHTML = "�������û�����";
        document.getElementById("change_margin_1").style.marginBottom = 1 + "px";
        return false;
    } else if (!User.pwd) { //�����valueֵΪ��
        document.getElementById("remind_2").innerHTML = "���������룡";
        document.getElementById("change_margin_2").style.marginBottom = 1 + "px";
        document.getElementById("change_margin_3").style.marginTop = 2 + "px";
        return false;
    }
	else{
		alert("ע��ɹ�,������ת��¼����");
		return true;
	}
}
  

