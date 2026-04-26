$html = Get-Content -Path .\index.html -Raw -Encoding UTF8
$hasTable = $html -match '(?s)(<!-- ===== eFootball.*?ตารางคะแนน eFootball Student League\n          </h2>).*?</div>\s*</div>\s*</section>'

if ($hasTable) {
    $newSection = $matches[1] + "
          <div style="text-align: center; margin-top: 1.5rem;">
            <a href="efootball.html" class="btn btn-primary" style="font-size: 1.25rem; padding: 1rem 2rem;">ดูตารางคะแนน 20 ทีมทั้งหมด</a>
          </div>
        </div>
      </section>"
    $html = $html -replace '(?s)<!-- ===== eFootball.*?</section>', $newSection
    
    $utf8bom = New-Object System.Text.UTF8Encoding $true
    [System.IO.File]::WriteAllText("$(Get-Location)\index.html", $html, $utf8bom)
    Write-Output "Successfully replaced table in index.html with a button."
} else {
    Write-Output "Could not find the table section in index.html to replace."
}
