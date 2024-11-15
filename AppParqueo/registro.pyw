from PyQt5 import QtWidgets, uic
import subprocess

def logueo():

    name = login.lineEdit.text()
    password = login.lineEdit_2.text()

    if name == "prueba" and password == "123456":
        result = subprocess.run(['python', 'main.py'], capture_output=True, text=True)
        login.close()
        
    elif name != "prueba" and password != "123456":
        login.label_5.setText("Las credenciales no coinciden")
        login.lineEdit.clear()
        login.lineEdit_2.clear()
    
    else:
        login.label_5.setText("Aparentemente ocurrió un error, inténtelo nuevamente")
        login.lineEdit.clear()
        login.lineEdit_2.clear()

app = QtWidgets.QApplication([])
login = uic.loadUi("registro1.ui")
    
def salir():
    app.exit()

login.pushButton.clicked.connect(logueo)
login.pushButton_3.clicked.connect(salir)

login.show()
app.exec_()
