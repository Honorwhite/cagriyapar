import os

old_footer = """                <div class="footer-col">
                    <h4>Bloglarımız</h4>
                    <ul>
                        <li><a href="blog-normal-dogumun-avantajlari">Normal Doğum Avantajları</a></li>
                        <li><a href="blog-gebelik-doneminde-beslenme">Gebelikte Beslenme</a></li>
                    </ul>
                </div>"""

new_footer = """                <div class="footer-col">
                    <h4>Bilgilendirme</h4>
                    <ul>
                        <li><a href="blog">Kadın Sağlığı Blogu</a></li>
                        <li><a href="sikca-sorulan-sorular">Sıkça Sorulan Sorular</a></li>
                    </ul>
                </div>"""

files = [
    "blog-gebelik-doneminde-beslenme.html",
    "blog-genital-estetik-sss.html",
    "blog-normal-dogumun-avantajlari.html",
    "blog.html",
    "gebelik-takibi-adana.html",
    "genital-estetik-adana.html",
    "hakkimda.html",
    "iletisim.html",
    "infertilite-tedavisi-adana.html",
    "kadin-hastaliklari-adana.html",
    "laparoskopik-cerrahi-adana.html",
    "uzmanlik-alanlari.html"
]

for filename in files:
    if os.path.exists(filename):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if old_footer in content:
            updated_content = content.replace(old_footer, new_footer)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(updated_content)
            print(f"Updated {filename}")
        else:
            print(f"Footer not found in {filename}")
